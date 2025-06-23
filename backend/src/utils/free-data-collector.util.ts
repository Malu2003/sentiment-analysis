export class FreeDataCollector {
  static async collectData(target: string, sources: string[]): Promise<string[]> {
    const collectedData: string[] = [];

    for (const source of sources) {
      try {
        console.log(`🔍 Collecting data from ${source} for target: ${target}`);
        
        switch (source.toLowerCase()) {
          case 'reddit':
            const redditData = await this.collectFromReddit(target);
            collectedData.push(...redditData);
            break;
            
          case 'hackernews':
            const hnData = await this.collectFromHackerNews(target);
            collectedData.push(...hnData);
            break;
            
          case 'mastodon':
            const mastodonData = await this.collectFromMastodon(target);
            collectedData.push(...mastodonData);
            break;
            
          default:
            console.log(` Unknown source: ${source}`);
        }
      } catch (error) {
        console.error(`Error collecting from ${source}:`, error.message);
      }
    }

    console.log(` Total data collected: ${collectedData.length} items`);
    return collectedData;
  }

  private static async collectFromReddit(target: string): Promise<string[]> {
    try {
      // Use Reddit's public JSON API (no auth required)
      const searchUrl = `https://www.reddit.com/search.json?q=${encodeURIComponent(target)}&limit=20&sort=relevance`;
      
      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent': 'SentimentAnalysisTool/1.0 (Educational Purpose)',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Reddit API error: ${response.status}`);
      }

      const data = await response.json();
      const posts = data.data?.children || [];

      const redditTexts = posts.map((post: any) => {
        const postData = post.data;
        const title = postData.title || '';
        const selftext = postData.selftext || '';
        const combined = `${title} ${selftext}`.trim();
        return combined;
      }).filter((text: string) => text.length > 20);

      console.log(` Reddit: Collected ${redditTexts.length} posts`);
      return redditTexts;

    } catch (error) {
      console.error(' Reddit collection error:', error.message);
      return this.getMockRedditData(target);
    }
  }

  private static async collectFromHackerNews(target: string): Promise<string[]> {
    try {
      // Use Algolia HN Search API
      const searchUrl = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(target)}&hitsPerPage=20&tags=story`;
      
      const response = await fetch(searchUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HackerNews API error: ${response.status}`);
      }

      const data = await response.json();
      const hits = data.hits || [];

      const hnTexts = hits.map((hit: any) => {
        const title = hit.title || '';
        const text = hit.story_text || hit.comment_text || '';
        const combined = `${title} ${text}`.trim();
        return combined;
      }).filter((text: string) => text.length > 20);

      console.log(`✅ HackerNews: Collected ${hnTexts.length} stories`);
      return hnTexts;

    } catch (error) {
      console.error('❌ HackerNews collection error:', error.message);
      return this.getMockHackerNewsData(target);
    }
  }

  private static async collectFromMastodon(target: string): Promise<string[]> {
    try {
      // Use a public Mastodon instance API (mastodon.social)
      const searchUrl = `https://mastodon.social/api/v2/search?q=${encodeURIComponent(target)}&type=statuses&limit=20`;
      
      const response = await fetch(searchUrl, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Mastodon API error: ${response.status}`);
      }

      const data = await response.json();
      const statuses = data.statuses || [];

      const mastodonTexts = statuses.map((status: any) => {
        // Remove HTML tags from Mastodon content
        const content = status.content?.replace(/<[^>]*>/g, '') || '';
        return content.trim();
      }).filter((text: string) => text.length > 20);

      console.log(`✅ Mastodon: Collected ${mastodonTexts.length} posts`);
      return mastodonTexts;

    } catch (error) {
      console.error('❌ Mastodon collection error:', error.message);
      return this.getMockMastodonData(target);
    }
  }

  // Fallback mock data methods for when APIs fail
  private static getMockRedditData(target: string): string[] {
    return [
      `Just tried ${target} for the first time and I'm really impressed with the quality`,
      `Has anyone else noticed issues with ${target} lately? Mine has been acting up`,
      `${target} vs alternatives - what do you think is better and why?`,
      `Love the new features in ${target}, especially the improved user interface`,
      `Not sure if ${target} is worth the hype, seems overpriced to me`
    ];
  }

  private static getMockHackerNewsData(target: string): string[] {
    return [
      `${target} announces new features that could disrupt the market`,
      `Show HN: Built an alternative to ${target} over the weekend`,
      `Technical analysis of ${target}'s architecture and scalability`,
      `${target} security vulnerability discovered by researchers`,
      `Why ${target} is becoming the standard in its industry`
    ];
  }

  private static getMockMastodonData(target: string): string[] {
    return [
      `Really enjoying my experience with ${target} so far, great community`,
      `${target} has some interesting potential but needs more development`,
      `Comparing ${target} to other options in the space, thoughts?`,
      `The ${target} team seems to be listening to user feedback well`,
      `Mixed feelings about ${target}, some good points but also concerns`
    ];
  }
}