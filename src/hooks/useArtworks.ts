import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Artwork, Commission } from '@/types/artwork';

export const useArtworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setArtworks(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  return { artworks, loading, error, refetch: fetchArtworks };
};

export const useFeaturedArtworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from('artworks')
          .select('*')
          .eq('is_featured', true)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setArtworks(data || []);
      } catch (err) {
        console.error('Error fetching featured artworks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { artworks, loading };
};

export const useCommissions = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const { data, error } = await supabase
          .from('commissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCommissions(data || []);
      } catch (err) {
        console.error('Error fetching commissions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommissions();
  }, []);

  return { commissions, loading };
};

export const useArtworkMutations = () => {
  const [loading, setLoading] = useState(false);

  const createArtwork = async (artwork: Omit<Artwork, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('artworks')
        .insert([artwork])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateArtwork = async (id: string, updates: Partial<Artwork>) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('artworks')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteArtwork = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('artworks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { createArtwork, updateArtwork, deleteArtwork, loading };
};
