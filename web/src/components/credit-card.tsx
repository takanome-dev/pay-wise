'use client';

import Image from 'next/image';
import React from 'react';

import type { CardSchemaType } from '~/lib/schemas/card';

interface CreditCardProps {
  card: CardSchemaType;
}

const CreditCard = (props: CreditCardProps) => {
  const [show, setShow] = React.useState(false);
  const { card } = props;
  // TODO: format money based on currency

  return (
    <div
      className="bg-slate-800 dark:bg-slate-700 rounded-lg p-6 overflow-hidden shadow-md"
      onClick={() => setShow(!show)}
      onKeyDown={() => setShow(!show)}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-300 text-xs">Card balance</p>
          <p className="text-slate-100 font-bold text-xl">${card.balance}</p>
        </div>
        <div>
          <Image
            src={card.brand === 'visa' ? '/visa.svg' : '/mastercard.svg'}
            alt={`${card.brand} logo`}
            width={60}
            height={60}
          />
        </div>
      </div>
      <div className="my-6">
        <p className="text-slate-100 text-2xl font-bold max-w-xs overflow-hidden">
          {show ? card.cc_number : `**** **** **** ${card.cc_number.slice(-4)}`}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-300 text-xs">Expiration</p>
          <p className="text-slate-100 font-semibold">
            {show ? `${card.exp_month}/${card.exp_year}` : '****'}
          </p>
        </div>
        <div>
          <p className="text-slate-300 text-xs">CVV</p>
          <p className="text-slate-100 font-semibold">
            {show ? card.cvv : '***'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
