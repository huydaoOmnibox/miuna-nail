import { z } from "zod";

// User schemas
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const insertUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  customerId: z.number().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = {
  id: number;
  username: string;
  password: string;
  customerId?: number;
};

// Product schemas
export const insertProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = {
  id: number;
  name: string;
  description?: string;
  price?: string;
  category?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
};

// Gallery schemas
export const insertGallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  image: z.string().min(1, "Image is required"),
  category: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type Gallery = {
  id: number;
  title: string;
  description?: string;
  image: string;
  category?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
};

// Pricing schemas
export const insertPricingSchema = z.object({
  serviceName: z.string().min(1, "Service name is required"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  duration: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export type InsertPricing = z.infer<typeof insertPricingSchema>;
export type Pricing = {
  id: number;
  serviceName: string;
  price: string;
  category: string;
  description?: string;
  duration?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
};

// Home content schemas
export const insertHomeContentSchema = z.object({
  customerId: z.number().default(1),
  section: z.string().min(1, "Section is required"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type InsertHomeContent = z.infer<typeof insertHomeContentSchema>;
export type HomeContent = {
  id: number;
  customerId: number;
  section: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  image?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
