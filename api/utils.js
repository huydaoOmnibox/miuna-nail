import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { z } from "zod";

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL environment variable is required');
}

if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY environment variable is required');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Table names for Supabase
const TABLES = {
  users: 'users',
  products: 'products', 
  gallery: 'gallery',
  pricing: 'pricing',
  homeContent: 'home_content'
};

// Zod schemas for validation
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const insertProductSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const insertGallerySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  category: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const insertPricingSchema = z.object({
  serviceName: z.string(),
  price: z.string(),
  category: z.string(),
  description: z.string().optional(),
  duration: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export const insertHomeContentSchema = z.object({
  customerId: z.number().optional(),
  section: z.string(),
  title: z.string().nullable().optional(),
  subtitle: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  content: z.union([z.string(), z.array(z.string())]).nullable().optional(),
  image: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

// Storage functions using Supabase
export const storage = {
  // Authentication
  async getUserByUsername(username) {
    const { data, error } = await supabase
      .from(TABLES.users)
      .select('*')
      .eq('username', username)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      throw error;
    }
    return data;
  },
  
  async createUser(userData) {
    const { data, error } = await supabase
      .from(TABLES.users)
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Products
  async getProducts() {
    const { data, error } = await supabase
      .from(TABLES.products)
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },
  
  async getProduct(id) {
    const { data, error } = await supabase
      .from(TABLES.products)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    return data;
  },
  
  async createProduct(product) {
    const { data, error } = await supabase
      .from(TABLES.products)
      .insert(product)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async updateProduct(id, product) {
    const { data, error } = await supabase
      .from(TABLES.products)
      .update({ ...product, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async deleteProduct(id) {
    const { error } = await supabase
      .from(TABLES.products)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Gallery
  async getGalleryItems() {
    const { data, error } = await supabase
      .from(TABLES.gallery)
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },
  
  async getGalleryItem(id) {
    const { data, error } = await supabase
      .from(TABLES.gallery)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    return data;
  },
  
  async createGalleryItem(item) {
    const { data, error } = await supabase
      .from(TABLES.gallery)
      .insert(item)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async updateGalleryItem(id, item) {
    const { data, error } = await supabase
      .from(TABLES.gallery)
      .update({ ...item, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async deleteGalleryItem(id) {
    const { error } = await supabase
      .from(TABLES.gallery)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Pricing
  async getPricingItems() {
    const { data, error } = await supabase
      .from(TABLES.pricing)
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },
  
  async getPricingItem(id) {
    const { data, error } = await supabase
      .from(TABLES.pricing)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    return data;
  },
  
  async createPricingItem(item) {
    const { data, error } = await supabase
      .from(TABLES.pricing)
      .insert(item)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async updatePricingItem(id, item) {
    const { data, error } = await supabase
      .from(TABLES.pricing)
      .update({ ...item, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async deletePricingItem(id) {
    const { error } = await supabase
      .from(TABLES.pricing)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Home Content
  async getHomeContents() {
    const { data, error } = await supabase
      .from(TABLES.homeContent)
      .select('*')
      .order('id', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },
  
  async getHomeContent(id) {
    if (id) {
      const { data, error } = await supabase
        .from(TABLES.homeContent)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      return data;
    } else {
      return this.getHomeContents();
    }
  },
  
  async createHomeContent(item) {
    const { data, error } = await supabase
      .from(TABLES.homeContent)
      .insert(item)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async updateHomeContent(id, item) {
    const { data, error } = await supabase
      .from(TABLES.homeContent)
      .update({ ...item, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async deleteHomeContent(id) {
    const { error } = await supabase
      .from(TABLES.homeContent)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
}; 