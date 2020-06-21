import React, { useEffect, useState } from 'react';
import { IonSearchbar, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonSelect, IonSelectOption, IonHeader, IonFab, IonFabButton, IonIcon, IonPage, IonContent } from '@ionic/react';
import { refreshOutline } from 'ionicons/icons';
import { useAllPublications } from '../../hooks';
import PublicationList from '../../containers/PublicationList';
import './style.css';

const Search: React.FC = () => {
  const { publications, loading, changeOptions } = useAllPublications({});
  const [search, setSearch] = useState<string>('');
  const [searchBy, setSearchBy] = useState<string>('to');
  const [opStr, setOpStr] = useState<firebase.firestore.WhereFilterOp>('>=');

  useEffect(() => { changeOptions({ search, opStr, searchBy }) }, [search, opStr, searchBy])

  function handleSearch(e: any) { setSearch(e.target.value); }
  function handleSearchBy(e: any) { setSearchBy(e.detail.value); }
  function handleOpStr(e: any) { setOpStr(e.detail.value); }
  function handleRefresh() { setSearch(''); setSearchBy('to'); setOpStr('>='); }

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
        <PublicationList publications={publications} isLoading={loading} />
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
