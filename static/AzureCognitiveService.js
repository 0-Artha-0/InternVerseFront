const { TextAnalyticsClient, AzureKeyCredential } = require('@azure/ai-language-text');
const config = require('../config/config');

class AzureCognitiveService {
  constructor() {
    this.client = new TextAnalyticsClient(
      config.azureCognitiveServicesEndpoint,
      new AzureKeyCredential(config.azureCognitiveServicesKey)
    );
  }

  /**
   * Analyze sentiment of student submission
   * @param {string} text - Text to analyze
   * @returns {Promise<Object>} - Sentiment analysis results
   */
  async analyzeSentiment(text) {
    try {
      const results = await this.client.analyzeSentiment([text]);
      return results[0];
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      throw new Error('Failed to analyze sentiment');
    }
  }

  /**
   * Extract key phrases from text
   * @param {string} text - Text to analyze
   * @returns {Promise<Array>} - Extracted key phrases
   */
  async extractKeyPhrases(text) {
    try {
      const results = await this.client.extractKeyPhrases([text]);
      return results[0].keyPhrases;
    } catch (error) {
      console.error('Error extracting key phrases:', error);
      throw new Error('Failed to extract key phrases');
    }
  }

  /**
   * Detect language of text
   * @param {string} text - Text to analyze
   * @returns {Promise<Object>} - Detected language
   */
  async detectLanguage(text) {
    try {
      const results = await this.client.detectLanguage([text]);
      return results[0];
    } catch (error) {
      console.error('Error detecting language:', error);
      throw new Error('Failed to detect language');
    }
  }

  /**
   * Analyze submission quality using multiple cognitive services
   * @param {string} submission - Student's submission content
   * @returns {Promise<Object>} - Analysis results
   */
  async analyzeSubmissionQuality(submission) {
    try {
      // Run multiple analyses in parallel
      const [sentiment, keyPhrases] = await Promise.all([
        this.analyzeSentiment(submission),
        this.extractKeyPhrases(submission)
      ]);

      // Calculate complexity score based on submission length and key phrases
      const wordCount = submission.split(/\s+/).length;
      const uniqueKeyPhraseCount = new Set(keyPhrases).size;
      const complexityScore = Math.min(100, (wordCount / 500) * 50 + (uniqueKeyPhraseCount / 20) * 50);

      // Calculate overall quality score
      const sentimentScore = (sentiment.confidenceScores.positive * 100);
      const overallScore = (complexityScore * 0.7) + (sentimentScore * 0.3);

      return {
        complexity: {
          score: complexityScore,
          wordCount,
          keyPhraseCount: uniqueKeyPhraseCount,
          keyPhrases: keyPhrases.slice(0, 10) // Return top 10 key phrases
        },
        sentiment: {
          score: sentimentScore,
          positive: sentiment.confidenceScores.positive,
          neutral: sentiment.confidenceScores.neutral,
          negative: sentiment.confidenceScores.negative
        },
        overallScore: Math.round(overallScore)
      };
    } catch (error) {
      console.error('Error analyzing submission quality:', error);
      throw new Error('Failed to analyze submission quality');
    }
  }
}

module.exports = new AzureCognitiveService();
