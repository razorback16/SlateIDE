import { ProvidersSection } from '@/components/models/providers-section';
import { ModelsSection } from '@/components/models/models-section';
import { AddProviderDialog } from '@/components/models/add-provider-dialog';

export function ModelsView() {
  return (
    <>
      <div className="flex h-full">
        <div className="w-1/3 min-w-[300px] max-w-[400px]">
          <ProvidersSection />
        </div>
        <div className="flex-1">
          <ModelsSection />
        </div>
      </div>
      <AddProviderDialog />
    </>
  );
}