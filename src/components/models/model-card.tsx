import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MODEL_CAPABILITIES } from '@/types/models';
import type { Model } from '@/types/models';
import { ChevronDown, ChevronUp, Star, Calendar, Hash, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModelCardProps {
  model: Model;
  isSelected: boolean;
  onToggleSelection: (modelId: string) => void;
}

export function ModelCard({ model, isSelected, onToggleSelection }: ModelCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
    return num.toString();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(`${dateStr}-01`);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onToggleSelection(model.id)}
              className="mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{model.name}</CardTitle>
                {model.isDefault && (
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                )}
              </div>
              <CardDescription className="mt-1 line-clamp-2">
                {model.description}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {model.capabilities.map((capability) => {
            const capInfo = MODEL_CAPABILITIES[capability.toLowerCase()];
            return (
              <Badge
                key={capability}
                variant="secondary"
                className={cn(
                  "text-xs",
                  capInfo && `${capInfo.color} text-white`
                )}
              >
                {capInfo?.name || capability}
              </Badge>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Hash className="h-3 w-3" />
            <span>Context: {formatNumber(model.contextLength)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(model.releaseDate)}</span>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {model.family && (
                <div>
                  <span className="text-muted-foreground">Family:</span>{' '}
                  <span className="font-medium">{model.family}</span>
                </div>
              )}
              {model.size && (
                <div>
                  <span className="text-muted-foreground">Size:</span>{' '}
                  <span className="font-medium">{model.size}</span>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">Max Output:</span>{' '}
                <span className="font-medium">{formatNumber(model.maxTokens)} tokens</span>
              </div>
            </div>

            {model.costPerMillion && (
              <div className="flex items-center gap-4 text-sm">
                <Coins className="h-3 w-3 text-muted-foreground" />
                <div className="flex gap-4">
                  <div>
                    <span className="text-muted-foreground">Input:</span>{' '}
                    <span className="font-medium">${model.costPerMillion.input}/M</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Output:</span>{' '}
                    <span className="font-medium">${model.costPerMillion.output}/M</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}