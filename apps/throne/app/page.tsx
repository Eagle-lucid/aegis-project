// apps/throne/app/page.tsx
'use client';

import { motion } from "framer-motion";
import { GlassLayout } from "@/components/layouts/GlassLayout";
import { SentinelPanel } from "@/components/panel/SentinelPanel";
import { TreasuryPanel } from "@/components/panel/TreasuryPanel";
import { CommandPanel } from "@/components/panel/CommandPanel";
import { ChroniclePanel } from "@/components/panel/ChroniclePanel";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ThronePage() {
    return (
        <GlassLayout>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          > 
            {/* Sentinel */}
            <motion.div variants={itemVariants}>
            <SentinelPanel />
            </motion.div>

            {/* Treasury + Command (Side by Side on desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                <TreasuryPanel />
                </motion.div>
                <motion.div variants={itemVariants}>
                <CommandPanel />
                </motion.div>
            </div>

            {/* Chronicle */}
            <motion.div variants={itemVariants}>
            <ChroniclePanel />
            </motion.div>
          </motion.div>
        </GlassLayout>
    );
};