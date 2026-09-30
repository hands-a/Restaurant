import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils } from 'react-icons/fa';
import MenuCard from './MenuCard';
import EmptyState from '../../../components/ui/EmptyState';
import Section from '../../../components/layout/Section';

const RelatedProducts = ({ products = [], title = 'More from the kitchen' }) => {
  return (
    <Section padding="pt-16 pb-0" className="border-t border-border">
      <h2 className="text-heading-1 mb-10 italic">
        {title}
      </h2>

      {products.length === 0 ? (
        <EmptyState
          icon={FaUtensils}
          title="No related dishes"
          description="Check out our full menu to discover more dishes you'll love."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <MenuCard item={item} />
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
};

export default RelatedProducts;
