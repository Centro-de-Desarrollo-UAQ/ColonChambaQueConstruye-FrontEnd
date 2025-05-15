'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

// Componentes originales (sin modificaciones)
const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    orientation?: 'horizontal' | 'vertical';
  }
>(({ className, orientation = 'horizontal', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'bg-uaq-default-200 text-muted-foreground inline-flex h-12 items-center justify-center rounded-lg p-1 px-2',
      orientation === 'vertical' && 'h-auto flex-col items-start',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    orientation?: 'horizontal' | 'vertical';
  }
>(({ className, orientation = 'horizontal', ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'font-400 ring-offset-background focus-visible:ring-ring data-[state=active]:bg-uaq-default-50 data-[state=active]:text-foreground inline-flex items-center justify-center rounded-md px-3 py-2 text-sm whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
      orientation === 'vertical' && 'w-full justify-start',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:ring-ring mt-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Componentes VerticalTabs simplificados (solo variante default)
const VerticalTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('flex h-auto flex-col space-y-2 rounded-sm bg-transparent p-2', className)}
    {...props}
  />
));
VerticalTabsList.displayName = 'VerticalTabsList';

const VerticalTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'w-full rounded-sm px-4 py-3 text-left transition-all',
      'text-foreground hover:bg-uaq-default-100 hover:text-uaq-default-700',
      'data-[state=active]:bg-uaq-default-600 data-[state=active]:text-uaq-default-50',
      'focus-visible:ring-uaq-default-500 focus-visible:ring-2 focus-visible:outline-none',
      'disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
VerticalTabsTrigger.displayName = 'VerticalTabsTrigger';

// Exportaciones
export { Tabs, TabsList, TabsTrigger, TabsContent };
export { VerticalTabsList, VerticalTabsTrigger };

// Aliases para consistencia
export const VerticalTabs = Tabs;
export const VerticalTabsContent = TabsContent;
