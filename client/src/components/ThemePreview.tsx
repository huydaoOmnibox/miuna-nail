import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BRAND_COLORS, THEME } from '@/lib/constants';

export const ThemePreview: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          MiuNa Nails & Beauty Theme
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Updated theme colors inspired by the MiuNa brand logo and menu design, 
          featuring the signature four-leaf clover green and elegant black accents.
        </p>
      </div>

      {/* Brand Colors */}
      <Card className="border-2 border-miuna-200">
        <CardHeader className="bg-gradient-to-r from-miuna-500 to-miuna-600 text-white">
          <CardTitle>Brand Color Palette</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-miuna-500 rounded-lg mx-auto mb-2 shadow-lg"></div>
              <p className="font-semibold text-neutral-800">Primary Green</p>
              <p className="text-sm text-neutral-600">#7FB069</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-neutral-900 rounded-lg mx-auto mb-2 shadow-lg"></div>
              <p className="font-semibold text-neutral-800">Secondary Black</p>
              <p className="text-sm text-neutral-600">#1A1A1A</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-miuna-100 rounded-lg mx-auto mb-2 shadow-lg border border-miuna-300"></div>
              <p className="font-semibold text-neutral-800">Light Green</p>
              <p className="text-sm text-neutral-600">#E1EFDB</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-neutral-100 rounded-lg mx-auto mb-2 shadow-lg border border-neutral-300"></div>
              <p className="font-semibold text-neutral-800">Light Gray</p>
              <p className="text-sm text-neutral-600">#F5F5F5</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Color Scale</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* MiuNa Green Scale */}
            <div>
              <h3 className="font-semibold text-neutral-800 mb-3">MiuNa Green Scale</h3>
              <div className="flex space-x-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className={`w-12 h-12 rounded-lg shadow-md mb-1 bg-miuna-${shade}`}
                    ></div>
                    <p className="text-xs text-neutral-600">{shade}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Neutral Scale */}
            <div>
              <h3 className="font-semibold text-neutral-800 mb-3">Neutral Scale</h3>
              <div className="flex space-x-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div 
                      className={`w-12 h-12 rounded-lg shadow-md mb-1 bg-neutral-${shade}`}
                    ></div>
                    <p className="text-xs text-neutral-600">{shade}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Component Examples</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Badge className="bg-miuna-500 text-white">Primary Badge</Badge>
              <Badge className="bg-neutral-900 text-white">Secondary Badge</Badge>
              <Badge className="bg-miuna-100 text-miuna-800 border border-miuna-300">Light Badge</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-miuna-50 to-miuna-100 border-miuna-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-miuna-800 mb-2">Light Green Card</h4>
                  <p className="text-sm text-miuna-700">Perfect for service highlights</p>
                </CardContent>
              </Card>
              
              <Card className="bg-neutral-900 text-white border-neutral-700">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Dark Card</h4>
                  <p className="text-sm text-neutral-300">Elegant contrast option</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-miuna-300 shadow-lg">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-neutral-800 mb-2">White Card</h4>
                  <p className="text-sm text-neutral-600">Clean and minimal</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Constants */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Constants</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Border Radius</h3>
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-miuna-500 rounded-lg"></div>
                <div className="w-20 h-20 bg-miuna-500 rounded-xl"></div>
                <div className="w-20 h-20 bg-miuna-500 rounded-2xl"></div>
                <div className="w-20 h-20 bg-miuna-500 rounded-3xl"></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Shadows</h3>
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-white rounded-lg shadow"></div>
                <div className="w-20 h-20 bg-white rounded-lg shadow-lg"></div>
                <div className="w-20 h-20 bg-white rounded-lg shadow-2xl"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
