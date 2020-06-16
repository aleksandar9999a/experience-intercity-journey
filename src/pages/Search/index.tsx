import React, { useEffect, useState } from 'react';
import { IonSearchbar, IonToolbar, IonList } from '@ionic/react';
import { getPublications } from '../../services';
import IPublication from '../../interfaces/IPublication';
import PublicationListItem from '../../components/PublicationListItem';

const Search: React.FC = () => {
  const [list, setList] = useState<JSX.Element[]>([]);
  const [items, setItem] = useState<IPublication[]>([]);

  useEffect(() => {
    const newList = items.map((x, i) => <PublicationListItem key={i} data={x} />);
    setList(newList);
  }, [items])

  useEffect(() => {
    getPublications({}).then(snapshot => {
      snapshot.forEach(doc => {
        setItem((oldItems) => {
          let newItems= [...oldItems];
          newItems.push(doc.data() as IPublication);
          return newItems;
        })
      })
    })
  }, [])

  return (
    <div>
      <IonToolbar>
        <IonSearchbar placeholder="Where will you travel?" type="tel" showCancelButton="focus" debounce={1000}></IonSearchbar>
      </IonToolbar>
      <IonList>
        {list}
      </IonList>
    </div>
  );
};

export default Search;
