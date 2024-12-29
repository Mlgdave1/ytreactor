import React from 'react';
import { Type, AlignLeft, Image } from 'lucide-react';

interface GuideStep {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface TemplateGuideProps {
  onClose: () => void;
  currentStep: number;
  onNextStep: () => void;
}

const steps: GuideStep[] = [
  {
    title: 'Add Lower Third',
    description: 'Start by adding a lower third to display your name and channel',
    icon: AlignLeft,
  },
  {
    title: 'Add Title',
    description: 'Add a title to your video for better context',
    icon: Type,
  },
  {
    title: 'Add Logo',
    description: 'Place your channel logo for branding',
    icon: Image,
  }
];

export const TemplateGuide: React.FC<TemplateGuideProps> = ({
  onClose,
  currentStep,
  onNextStep
}) => {
  const step = steps[currentStep];

  return (
    <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="p-6 bg-[#1a1a1a] rounded-lg border border-[#272727] shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-3">
          <step.icon size={24} className="text-blue-400" />
          <h3 className="text-xl font-semibold text-white">{step.title}</h3>
        </div>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">{step.description}</p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Don't show again
          </button>
          <button
            onClick={currentStep === steps.length - 1 ? onClose : onNextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};