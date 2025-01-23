/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

type Good = string;

export const goodsFromServer: Good[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [displayGoods, setDisplayGoods] = useState<Good[]>([
    ...goodsFromServer,
  ]);
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const [showReset, setShowReset] = useState<boolean>(false);

  const showGoods = (field: string, reverse = isReverse) => {
    setSortField(field);
    setIsReverse(reverse);
    setShowReset(true);
    if (field === 'alphabetical') {
      if (reverse) {
        setDisplayGoods(
          [...goodsFromServer].sort((a, b) => a.localeCompare(b)).reverse(),
        );
      } else {
        setDisplayGoods(
          [...goodsFromServer].sort((a, b) => a.localeCompare(b)),
        );
      }
    }

    if (field === 'length') {
      if (reverse) {
        setDisplayGoods(
          [...goodsFromServer].sort((a, b) => a.length - b.length).reverse(),
        );
      } else {
        setDisplayGoods(
          [...goodsFromServer].sort((a, b) => a.length - b.length),
        );
      }
    }
  };

  const reverseHandler = () => {
    setIsReverse(!isReverse);
    displayGoods.reverse();
    setShowReset(!isReverse || sortField !== '');
  };

  const reset = () => {
    setDisplayGoods([...goodsFromServer]);
    setIsReverse(false);
    setShowReset(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'alphabetical' ? '' : 'is-light'}`}
          onClick={() => showGoods('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
          onClick={() => showGoods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse ? '' : 'is-light'}`}
          onClick={reverseHandler}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayGoods?.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
