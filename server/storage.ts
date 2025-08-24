import { 
  type User, 
  type InsertUser,
  type Product,
  type InsertProduct,
  type Gallery,
  type InsertGallery,
  type Pricing,
  type InsertPricing,
  type HomeContent,
  type InsertHomeContent
} from "@shared/schema";
import { supabase } from "./supabase";

// Storage interface remains the same
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Gallery methods
  getGalleryItems(): Promise<Gallery[]>;
  getGalleryItem(id: number): Promise<Gallery | undefined>;
  createGalleryItem(item: InsertGallery): Promise<Gallery>;
  updateGalleryItem(id: number, item: Partial<InsertGallery>): Promise<Gallery | undefined>;
  deleteGalleryItem(id: number): Promise<boolean>;
  
  // Pricing methods
  getPricingItems(): Promise<Pricing[]>;
  getPricingItem(id: number): Promise<Pricing | undefined>;
  createPricingItem(item: InsertPricing): Promise<Pricing>;
  updatePricingItem(id: number, item: Partial<InsertPricing>): Promise<Pricing | undefined>;
  deletePricingItem(id: number): Promise<boolean>;
  
  // Home content methods
  getHomeContent(): Promise<HomeContent[]>;
  getHomeContentBySection(section: string): Promise<HomeContent | undefined>;
  createHomeContent(content: InsertHomeContent): Promise<HomeContent>;
  updateHomeContent(id: number, content: Partial<InsertHomeContent>): Promise<HomeContent | undefined>;
  deleteHomeContent(id: number): Promise<boolean>;
}

export class SupabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert(insertUser)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sortOrder', { ascending: true })
        .order('id', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getProduct(id: number): Promise<Product | undefined> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return undefined;
    }
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const productData = {
      name: insertProduct.name,
      description: insertProduct.description || null,
      price: insertProduct.price || null,
      category: insertProduct.category || null,
      image: insertProduct.image || null,
      isActive: insertProduct.isActive ?? true,
      sortOrder: insertProduct.sortOrder || 0,
    };
    
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateProduct(id: number, productUpdate: Partial<InsertProduct>): Promise<Product | undefined> {
    const updateData: any = {};
    
    if (productUpdate.name !== undefined) updateData.name = productUpdate.name;
    if (productUpdate.description !== undefined) updateData.description = productUpdate.description || null;
    if (productUpdate.price !== undefined) updateData.price = productUpdate.price || null;
    if (productUpdate.category !== undefined) updateData.category = productUpdate.category || null;
    if (productUpdate.image !== undefined) updateData.image = productUpdate.image || null;
    if (productUpdate.isActive !== undefined) updateData.isActive = productUpdate.isActive;
    if (productUpdate.sortOrder !== undefined) updateData.sortOrder = productUpdate.sortOrder || 0;
    
    updateData.updatedAt = new Date();
    
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    return error === null;
  }

  // Gallery methods
  async getGalleryItems(): Promise<Gallery[]> {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('sortOrder', { ascending: true })
        .order('id', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      return [];
    }
  }

  async getGalleryItem(id: number): Promise<Gallery | undefined> {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching gallery item:', error);
      return undefined;
    }
  }

  async createGalleryItem(insertGallery: InsertGallery): Promise<Gallery> {
    const galleryData = {
      title: insertGallery.title,
      description: insertGallery.description || null,
      image: insertGallery.image,
      category: insertGallery.category || null,
      isActive: insertGallery.isActive ?? true,
      sortOrder: insertGallery.sortOrder || 0,
    };
    
    const { data, error } = await supabase
      .from('gallery')
      .insert(galleryData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateGalleryItem(id: number, itemUpdate: Partial<InsertGallery>): Promise<Gallery | undefined> {
    const updateData: any = {};
    
    if (itemUpdate.title !== undefined) updateData.title = itemUpdate.title;
    if (itemUpdate.description !== undefined) updateData.description = itemUpdate.description || null;
    if (itemUpdate.image !== undefined) updateData.image = itemUpdate.image;
    if (itemUpdate.category !== undefined) updateData.category = itemUpdate.category || null;
    if (itemUpdate.isActive !== undefined) updateData.isActive = itemUpdate.isActive;
    if (itemUpdate.sortOrder !== undefined) updateData.sortOrder = itemUpdate.sortOrder || 0;
    
    updateData.updatedAt = new Date();
    
    const { data, error } = await supabase
      .from('gallery')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteGalleryItem(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    
    return error === null;
  }

  // Pricing methods
  async getPricingItems(): Promise<Pricing[]> {
    try {
      const { data, error } = await supabase
        .from('pricing')
        .select('*')
        .order('sortOrder', { ascending: true })
        .order('id', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching pricing items:', error);
      return [];
    }
  }

  async getPricingItem(id: number): Promise<Pricing | undefined> {
    try {
      const { data, error } = await supabase
        .from('pricing')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching pricing item:', error);
      return undefined;
    }
  }

  async createPricingItem(insertPricing: InsertPricing): Promise<Pricing> {
    const pricingData = {
      serviceName: insertPricing.serviceName,
      price: insertPricing.price,
      category: insertPricing.category,
      description: insertPricing.description || null,
      duration: insertPricing.duration || null,
      isActive: insertPricing.isActive ?? true,
      sortOrder: insertPricing.sortOrder || 0,
    };
    
    const { data, error } = await supabase
      .from('pricing')
      .insert(pricingData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updatePricingItem(id: number, itemUpdate: Partial<InsertPricing>): Promise<Pricing | undefined> {
    const updateData: any = {};
    
    if (itemUpdate.serviceName !== undefined) updateData.serviceName = itemUpdate.serviceName;
    if (itemUpdate.price !== undefined) updateData.price = itemUpdate.price;
    if (itemUpdate.category !== undefined) updateData.category = itemUpdate.category;
    if (itemUpdate.description !== undefined) updateData.description = itemUpdate.description || null;
    if (itemUpdate.duration !== undefined) updateData.duration = itemUpdate.duration || null;
    if (itemUpdate.isActive !== undefined) updateData.isActive = itemUpdate.isActive;
    if (itemUpdate.sortOrder !== undefined) updateData.sortOrder = itemUpdate.sortOrder || 0;
    
    updateData.updatedAt = new Date();
    
    const { data, error } = await supabase
      .from('pricing')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deletePricingItem(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('pricing')
      .delete()
      .eq('id', id);
    
    return error === null;
  }

  // Home content methods
  async getHomeContent(): Promise<HomeContent[]> {
    try {
      const { data, error } = await supabase
        .from('home_content')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching home content:', error);
      return [];
    }
  }

  async getHomeContentBySection(section: string): Promise<HomeContent | undefined> {
    try {
      const { data, error } = await supabase
        .from('home_content')
        .select('*')
        .eq('section', section)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching home content by section:', error);
      return undefined;
    }
  }

  async createHomeContent(insertHomeContent: InsertHomeContent): Promise<HomeContent> {
    const contentData = {
      customerId: insertHomeContent.customerId || 1, // Default to customer 1 if not specified
      section: insertHomeContent.section,
      title: insertHomeContent.title || null,
      subtitle: insertHomeContent.subtitle || null,
      description: insertHomeContent.description || null,
      content: insertHomeContent.content || null,
      image: insertHomeContent.image || null,
      isActive: insertHomeContent.isActive ?? true,
    };
    
    const { data, error } = await supabase
      .from('home_content')
      .insert(contentData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateHomeContent(id: number, contentUpdate: Partial<InsertHomeContent>): Promise<HomeContent | undefined> {
    const updateData: any = {};
    
    if (contentUpdate.customerId !== undefined) updateData.customerId = contentUpdate.customerId;
    if (contentUpdate.section !== undefined) updateData.section = contentUpdate.section;
    if (contentUpdate.title !== undefined) updateData.title = contentUpdate.title || null;
    if (contentUpdate.subtitle !== undefined) updateData.subtitle = contentUpdate.subtitle || null;
    if (contentUpdate.description !== undefined) updateData.description = contentUpdate.description || null;
    if (contentUpdate.content !== undefined) updateData.content = contentUpdate.content || null;
    if (contentUpdate.image !== undefined) updateData.image = contentUpdate.image || null;
    if (contentUpdate.isActive !== undefined) updateData.isActive = contentUpdate.isActive;
    
    updateData.updatedAt = new Date();
    
    const { data, error } = await supabase
      .from('home_content')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteHomeContent(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('home_content')
      .delete()
      .eq('id', id);
    
    return error === null;
  }
}

export const storage = new SupabaseStorage();
