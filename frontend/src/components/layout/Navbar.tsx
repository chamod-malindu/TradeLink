'use client';

import Link from 'next/link';
import { Wrench, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">TradeLink</span>
        </Link>

        <Link href="/new">
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Post a Request
          </Button>
        </Link>
      </div>
    </nav>
  );
}
