import { Feature } from '@/app/dashboard/features/page';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export class FeatureService {
  static async getFeatures(): Promise<Feature[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/features`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch features');
      return await response.json();
    } catch (error) {
      console.error('Error fetching features:', error);
      throw error;
    }
  }

  static async updateFeature(featureId: string, updates: Partial<Feature>): Promise<Feature> {
    try {
      const response = await fetch(`${API_BASE_URL}/features/${featureId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) throw new Error('Failed to update feature');
      return await response.json();
    } catch (error) {
      console.error('Error updating feature:', error);
      throw error;
    }
  }

  static async toggleFeature(featureId: string, enabled: boolean): Promise<Feature> {
    return this.updateFeature(featureId, { enabled });
  }
}