import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';

// Interfaces
import { IDetailsProps, IPublication, IUser, IPixabayImage } from '../interfaces/interfaces';
import IChat from '../interfaces/IChat';

// Components
import {
	IonItem,
	IonLabel,
	IonInput,
	IonDatetime,
	IonSelect,
	IonSelectOption,
	IonButton,
	IonPage,
	IonList,
	IonAvatar,
	IonContent
} from '@ionic/react';

// Assets
import assets from '../config/assets';


export const Details = observer(({ routerManager, validationManager, messageManager, publicationsManager, authManager, pixabayManager, chatManager }: IDetailsProps) => {
	const { id } = useParams<{ id: string }>();
	const [publication, setPublication] = useState<IPublication | null>(null);
	const [image, setImage] = useState<IPixabayImage>();
	const [creatorData, setCreatorData] = useState<IUser>();
	const [isCreator, setIsCreator] = useState<boolean>(false);

	function updatePublication(key: string, value: any) {
		setPublication({ ...publication as IPublication, [key]: value })
	}

	function handleFrom(e: any) {
		return updatePublication('from', e.target.value);
	}

	function handleTo(e: any) {
		return updatePublication('to', e.target.value);
	}

	function handleDate(e: any) {
		return updatePublication('date', e.target.value);
	}

	function handleTime(e: any) {
		return updatePublication('time', e.target.value);
	}

	function handleType(e: any) {
		return updatePublication('type', e.target.value);
	}

	function submit() {
		const error = validationManager.getPublicationError(publication);

		if (error) {
			messageManager.addErrorMessage(error);
			return;
		}

		return publicationsManager.save(publication as IPublication);
	}

	function remove() {
		return publicationsManager.delete(id)
			.then(() => {
				routerManager.push(`/search`);
			});
	}

	function openChatBox() {
		return chatManager.openChatByMembers([authManager.user!.uid, publication!.creatorId as string])
			.then(data => {
				routerManager.push(`/chat/${(data as IChat).id}`)
			});
	}

	useEffect(() => {
		publicationsManager.get(id)
			.then(publication => {
				setPublication(publication as IPublication);
				const isCreator = (publication as IPublication).creatorId === authManager.user!.uid;
				setIsCreator(isCreator);

				if (!isCreator) {
					authManager.getUserdata((publication as IPublication).creatorId as string)
						.then(user => {
							setCreatorData(user);
						})
				}

				pixabayManager.getImage({ q: (publication as IPublication).to })
					.then(res => {
						if (!res) {
							return;
						}

						setImage(res.data.hits[0])
					})
			})
	}, [id])

	if (!publication) {
		return null;
	}

	return (
		<IonPage>
			<IonContent>
				<div className="details-preview">
					{!!image && <img src={image.largeImageURL} alt="preview" />}
				</div>

				<IonList>
					<IonItem className="details-item" disabled={!isCreator}>
						<IonLabel position="floating">From</IonLabel>

						<IonInput type="text" value={publication.from} onIonChange={handleFrom} />
					</IonItem>

					<IonItem className="details-item" disabled={!isCreator}>
						<IonLabel position="floating">To</IonLabel>

						<IonInput type="text" value={publication.to} onIonChange={handleTo} debounce={1000} />
					</IonItem>

					<IonItem className="details-item" disabled={!isCreator}>
						<IonLabel>Date</IonLabel>

						<IonDatetime placeholder="Select Date" value={publication.date} onIonChange={handleDate} />
					</IonItem>

					<IonItem className="details-item" disabled={!isCreator}>
						<IonLabel>Time</IonLabel>

						<IonDatetime placeholder="Select Time" display-format="h:mm A" picker-format="h:mm A" value={publication.time} onIonChange={handleTime} />
					</IonItem>

					<IonItem className="details-item" disabled={!isCreator}>
						<IonLabel>Search</IonLabel>

						<IonSelect interface="action-sheet" value={publication.type} onIonChange={handleType}>
							<IonSelectOption value="transport">Transport</IonSelectOption>

							<IonSelectOption value="drive">To Drive</IonSelectOption>
						</IonSelect>
					</IonItem>
				</IonList>

				{isCreator && <div className="details-btn-wrapper">
					<div className="details-btns">
						<IonButton color="success" fill="outline" onClick={submit}>Edit</IonButton>

						<IonButton color="danger" fill="outline" onClick={remove}>Delete</IonButton>
					</div>
				</div>}

				{!isCreator && !!creatorData
					&& <IonItem>
						<IonAvatar className="creator-avatar">
							<img src={creatorData.image || assets.anonym} alt="creator" />
						</IonAvatar>

						<IonLabel>
							<p>Name: {creatorData.firstName} {creatorData.lastName}</p>

							<p>City: {creatorData.city}</p>

							<IonButton color="success" fill="solid" onClick={openChatBox}>Write message</IonButton>
						</IonLabel>
					</IonItem>
				}
			</IonContent>
		</IonPage>
	);
})
