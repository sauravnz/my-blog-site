<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head>
        <title>Personal Notes RSS Feed</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
          }
          .feed-title {
            color: #6366f1;
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }
          .feed-description {
            color: #666;
            margin-bottom: 2rem;
          }
          .item {
            border-bottom: 1px solid #e2e8f0;
            padding: 1rem 0;
            margin-bottom: 1rem;
          }
          .item-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          .item-title a {
            color: #1f2937;
            text-decoration: none;
          }
          .item-title a:hover {
            color: #6366f1;
            text-decoration: underline;
          }
          .item-description {
            color: #4b5563;
            margin-bottom: 0.5rem;
          }
          .item-meta {
            font-size: 0.875rem;
            color: #6b7280;
          }
          .item-categories {
            margin-top: 0.5rem;
          }
          .category {
            display: inline-block;
            background: #e2e8f0;
            color: #374151;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            margin-right: 0.5rem;
            margin-bottom: 0.25rem;
          }
        </style>
      </head>
      <body>
        <h1 class="feed-title">Personal Notes</h1>
        <p class="feed-description">Personal notes, thoughts, and discoveries. A clean, elegant space for ideas and learning.</p>

        <xsl:for-each select="rss/channel/item">
          <div class="item">
            <h2 class="item-title">
              <a href="{link}">
                <xsl:value-of select="title"/>
              </a>
            </h2>
            <div class="item-description">
              <xsl:value-of select="description"/>
            </div>
            <div class="item-meta">
              <strong>Published:</strong> <xsl:value-of select="pubDate"/>
            </div>
            <xsl:if test="category">
              <div class="item-categories">
                <strong>Tags:</strong>
                <xsl:for-each select="category">
                  <span class="category">
                    <xsl:value-of select="."/>
                  </span>
                </xsl:for-each>
              </div>
            </xsl:if>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

