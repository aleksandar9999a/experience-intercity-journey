import React, { useEffect, useState } from 'react';
import { IonSearchbar, IonToolbar, IonList, IonSegment, IonSegmentButton, IonLabel, IonSelect, IonSelectOption, IonHeader, IonFab, IonFabButton, IonIcon, IonPage, IonContent } from '@ionic/react';
import { getPublications } from '../../services';
import IPublication from '../../interfaces/IPublication';
import PublicationListItem from '../../components/PublicationListItem';
import './style.css';
import { refreshOutline } from 'ionicons/icons';

const Search: React.FC = () => {
  const [list, setList] = useState<JSX.Element[]>([]);
  const [items, setItems] = useState<IPublication[]>([]);
  const [search, setSearch] = useState<string>('');
  const [searchBy, setSearchBy] = useState<string>('to');
  const [opStr, setOpStr] = useState<firebase.firestore.WhereFilterOp>('>=');

  useEffect(() => {
    const newList = items.map((x, i) => <PublicationListItem key={i} data={x} />);
    setList(newList);
  }, [items])

  useEffect(() => { getManuallyPublications() }, [search, opStr, searchBy])

  function getManuallyPublications() {
    return getPublications({ search, opStr, searchBy }).then(snapshot => snapshot.forEach(pushToItems));
  }

  function pushToItems(doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) {
    setItems((oldItems) => {
      let newItems = [...oldItems];
      newItems.push(doc.data() as IPublication);
      return newItems;
    })
  }

  function handleSearch(e: any) { setItems([]); setSearch(e.target.value); }
  function handleSearchBy(e: any) { setItems([]); setSearchBy(e.detail.value); }
  function handleOpStr(e: any) { setItems([]); setOpStr(e.detail.value); }
  function handleRefresh() { setItems([]); getManuallyPublications(); }

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonSearchbar placeholder="Where will you travel?" inputmode="text" showCancelButton="focus" debounce={1000} onIonChange={handleSearch}></IonSearchbar>
          </IonToolbar>
          <IonToolbar>
            <IonSegment onIonChange={handleSearchBy} value={searchBy}>
              <IonSegmentButton value="from">
                <IonLabel>From</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="to">
                <IonLabel>To</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
          <IonToolbar>
            <IonSelect interface="action-sheet" onIonChange={handleOpStr} value={opStr} className="search-options-select">
              <IonSelectOption value="==" className="search-option">Exactly entered text</IonSelectOption>
              <IonSelectOption value=">=" className="search-option">Similar to the entered text</IonSelectOption>
            </IonSelect>
          </IonToolbar>
        </IonHeader>
        <IonList>{list}</IonList>
        <IonFab vertical="bottom" horizontal="start">
          <IonFabButton onClick={handleRefresh}>
            <IonIcon ios={refreshOutline} md={refreshOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Search;
