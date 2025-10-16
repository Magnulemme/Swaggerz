"use client";

import { motion } from 'framer-motion';
import { Wallet, Shirt, ArrowLeftRight } from 'lucide-react';
import CentralLock from './CentralLock';
import StepCard from './StepCard';

interface CircularDiagramProps {
  shaderDataUrls: string[];
}

export default function CircularDiagram({ shaderDataUrls }: CircularDiagramProps) {
  const steps = [
    {
      icon: Wallet,
      number: "1",
      title: "Acquista NFT",
      description: "Possiedi l'arte digitale esclusiva",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Shirt,
      number: "2",
      title: "Stampa su Capo",
      description: "Trasforma l'NFT in streetwear unico",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: ArrowLeftRight,
      number: "3",
      title: "Rivendi Licenza",
      description: "Trasferisci i diritti di stampa ad altri",
      color: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto xl:mx-0 aspect-square xl:order-1">
      {/* SVG con cerchi rotanti */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Cerchio principale rotante con trattini */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="0.3"
          strokeDasharray="3 3"
        />

        {/* Cerchio interno decorativo */}
        <circle
          cx="50"
          cy="50"
          r="28"
          fill="none"
          stroke="rgba(139, 92, 246, 0.1)"
          strokeWidth="0.2"
        />
      </motion.svg>

      {/* Centro con lucchetto animato */}
      <CentralLock />

      {/* Cards posizionate simmetricamente nel cerchio */}
      {steps.map((step, index) => (
        <StepCard
          key={index}
          icon={step.icon}
          number={step.number}
          title={step.title}
          description={step.description}
          color={step.color}
          index={index}
          shaderDataUrl={shaderDataUrls[index] || ''}
        />
      ))}
    </div>
  );
}
