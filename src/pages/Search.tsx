import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';

// Components
import PublicationListItem from '../components/PublicationListItem';
import {
  IonSearchbar,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonContent,
  IonSpinner,
  IonList
} from '@ionic/react';

// Icons
import { refreshOutline } from 'ionicons/icons';

// Interfaces
import { IPublication, ISearchProps } from '../interfaces/interfaces';


export const Search = observer(({ publicationsManager }: ISearchProps) => {
  const [publications, setPublications] = useState<IPublication[]>([]);
  const [search, setSearch] = useState<string>('');
  const [searchBy, setSearchBy] = useState<string>('to');
  const [opStr, setOpStr] = useState<firebase.firestore.WhereFilterOp>('>=');

  useEffect(() => {
    loadPublications();
  }, [])

  function loadPublications () {
    return publicationsManager.getMany({ search, opStr, searchBy })
      .then(items => {
        setPublications(items as IPublication[]);

        return items
      })
  }

  function handleSearch(e: any) {
    setSearch(e.target.value);
    loadPublications();
  }
  
  function handleSearchBy(e: any) {
    setSearchBy(e.detail.value);
    loadPublications();
  }

  function handleOpStr(e: any) {
    setOpStr(e.detail.value);
    loadPublications();
  }
  
  function handleRefresh() {
    setSearch('');
    setSearchBy('to');
    setOpStr('>=');
    loadPublications();
  }

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonSearchbar
              placeholder="Where will you travel?"
              inputmode="text"
              showCancelButton="focus"
              debounce={1000}
              onIonChange={handleSearch}
            />
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
              <IonSelectOption value="==" className="search-option">
                Exactly entered text
              </IonSelectOption>

              <IonSelectOption value=">=" className="search-option">
                Similar to the entered text
              </IonSelectOption>
            </IonSelect>
          </IonToolbar>
        </IonHeader>

        {publicationsManager.isLoading && (
          <div className="loading-publications">
            <IonSpinner className="spinner" />
          </div>
        )}

        {!publicationsManager.isLoading && (
          <IonList>
            {publications.map(x => {
              return <PublicationListItem key={x.id} data={x} />
            })}
          </IonList>
        )}

        <IonFab vertical="bottom" horizontal="start">
          <IonFabButton onClick={handleRefresh}>
            <IonIcon ios={refreshOutline} md={refreshOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
})
