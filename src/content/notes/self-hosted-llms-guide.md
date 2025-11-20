---
title: "Self-Hosted LLMs: A Practical Guide"
description: "Complete setup guide for running large language models locally on consumer hardware"
pubDate: "2024-01-12"
tags: ["AI", "Machine Learning", "Self-Hosted", "LLM", "GPU", "Docker"]
context: "Production-ready setup for Llama 2 7B/13B models with 8-24GB VRAM requirements."
stage: "published"
confidence: "high"
mood: "focused"
featured: true
---

# Self-Hosted LLMs: A Practical Guide

Running large language models locally has become increasingly practical with modern hardware and optimized implementations. This guide covers setting up a production-ready LLM inference stack.

## Hardware Requirements

### Minimum Setup (7B models)
- **GPU**: NVIDIA RTX 3060 12GB or RTX 4060 8GB
- **RAM**: 16GB system RAM
- **Storage**: 50GB free space
- **OS**: Linux (Ubuntu 22.04 recommended)

### Recommended Setup (13B-70B models)
- **GPU**: RTX 3090/4090 24GB or A100 40GB
- **RAM**: 32GB+ system RAM
- **Storage**: 200GB NVMe SSD
- **CPU**: 8+ cores for preprocessing

## Software Stack

### 1. Container Runtime
```bash
# Install Docker and NVIDIA runtime
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo apt-get install nvidia-docker2
sudo systemctl restart docker
```

### 2. Ollama (Recommended for beginners)
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull and run models
ollama pull llama2:7b
ollama pull codellama:13b

# Start web interface
ollama serve
```

### 3. Text Generation WebUI (Advanced users)
```bash
git clone https://github.com/oobabooga/text-generation-webui
cd text-generation-webui
pip install -r requirements.txt

# Download model (one-time setup)
python download-model.py TheBloke/Llama-2-7B-GGML

# Launch with optimizations
python server.py --model llama-2-7b.ggmlv3.q4_0.bin --n-gpu-layers 32 --load-in-8bit
```

## Performance Optimization

### GPU Memory Management
```python
# In text-generation-webui settings
{
  "gpu_memory": "22GB",  # Leave 2GB for system
  "load_in_8bit": true,  # 8-bit quantization
  "gpu_layers": 32,      # Offload max layers to GPU
  "context_length": 2048 # Reduce if memory constrained
}
```

### Quantization Options
- **4-bit**: Maximum memory savings, ~2GB for 7B model
- **8-bit**: Good balance, ~4GB for 7B model
- **16-bit**: Full precision, ~14GB for 7B model

## Production Deployment

### Docker Compose Setup
```yaml
version: '3.8'
services:
  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama-data:/root/.ollama
    environment:
      - OLLAMA_HOST=0.0.0.0:11434
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  webui:
    image: ghcr.io/ollama-webui/ollama-webui:main
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434

volumes:
  ollama-data:
```

### Reverse Proxy Configuration
```nginx
server {
    listen 80;
    server_name llm.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://localhost:11434;
    }
}
```

## Monitoring & Observability

### Key Metrics to Track
```bash
# GPU utilization
nvidia-smi --query-gpu=utilization.gpu,utilization.memory,memory.used --format=csv -l 1

# Model inference metrics
curl http://localhost:11434/api/metrics
```

### Logging Configuration
```json
{
  "logging": {
    "level": "INFO",
    "file": "/var/log/ollama.log",
    "rotation": "daily",
    "max_size": "100MB"
  }
}
```

## Security Considerations

### Network Security
```bash
# Firewall rules
sudo ufw allow from 10.0.0.0/8 to any port 11434
sudo ufw allow from 10.0.0.0/8 to any port 3000

# API authentication (if needed)
export OLLAMA_API_KEY=your-secret-key
```

### Model Security
- Scan downloaded models for malware
- Use official model repositories only
- Regular security updates
- Network isolation for production

## Cost Analysis

### Self-Hosted vs Cloud
| Metric | Self-Hosted | AWS Bedrock | OpenAI API |
|--------|-------------|-------------|------------|
| 7B Model | $0 (after hardware) | $0.0005/token | $0.0015/token |
| 13B Model | $0 (after hardware) | $0.001/token | $0.003/token |
| Setup Cost | $800-2000 | $0 | $0 |
| Monthly Cost | $20 (power) | Variable | Variable |

### Break-even Analysis
- **Light usage** (< 1M tokens/month): Self-hosted wins after 3-6 months
- **Heavy usage** (> 10M tokens/month): Self-hosted wins immediately
- **Privacy requirements**: Self-hosted always preferred

## Troubleshooting Common Issues

### CUDA Out of Memory
```bash
# Reduce batch size and context
python server.py --batch-size 1 --context-length 1024

# Use smaller model
ollama pull llama2:7b-chat  # instead of 70b
```

### Slow Inference
```bash
# Check GPU utilization
nvidia-smi

# Enable GPU acceleration
export CUDA_VISIBLE_DEVICES=0

# Use faster quantization
python download-model.py TheBloke/Llama-2-7B-GGML:q4_0
```

### Network Issues
```bash
# Test connectivity
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model": "llama2", "prompt": "Hello"}'

# Check firewall
sudo ufw status
```

## Future Considerations

### Scaling Up
- Multiple GPU setups with tensor parallelism
- Model quantization improvements (3-bit, 2-bit)
- Distributed inference across machines
- Hardware acceleration (TPUs, Intel GPUs)

### Integration Options
- LangChain for application development
- LlamaIndex for document Q&A
- Custom API development
- WebSocket support for real-time apps

## Conclusion

Self-hosted LLMs are now practical for many use cases. Start with a 7B model on consumer hardware, then scale up as needed. The privacy and cost benefits are significant for production workloads.

**Total setup time**: 2-4 hours for basic setup, 1-2 days for production deployment.

**Success rate**: High with proper hardware and following best practices.

> This setup powers my daily AI workflows and handles 1000+ queries per day without issues.

