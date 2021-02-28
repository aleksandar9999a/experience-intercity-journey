import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';

// Hooks
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Interfaces
import { IChatProps, IChatMessage, IUser } from '../interfaces/interfaces';

// Components
import { ErrorPage } from './ErrorPage';
import { LoadingPage } from './LoadingPage';
import {
	IonList,
	IonItem,
	IonInput,
	IonIcon,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonPage,
	IonContent,
	IonAvatar,
	IonLabel
} from '@ionic/react';

// Icons
import { sendOutline } from 'ionicons/icons';

// Assets
import assets from '../config/assets';


export const Chat = observer(({ chatManager, authManager }: IChatProps) => {
	const { id } = useParams<any>()
	const chat = chatManager.getChat(id)
	const [messages, loadingMessages, errMessages] = useCollectionData<IChatMessage>(chat);
	const [newMessage, setNewMessage] = useState<string>('');
	const [users, setUsers] = useState<IUser[]>([]);
	const chatListEnd = useRef(null);

	useEffect(() => {
		chatManager.getMessage(id)
			.then(data => {
				if (!data) {
					return;
				}

				authManager.getMultiplyUserdata(data.members)
					.then(users => {
						setUsers(users);
						(chatListEnd.current as any).scrollIntoView({ behavior: 'smooth' })
					})
			})
	}, [id])

	useEffect(() => {
			setTimeout(() => {
				if (!chatListEnd || !chatListEnd.current) {
					return;
				}

				(chatListEnd.current as any).scrollIntoView({ behavior: 'smooth' })
			}, 1000)
	}, [messages])

	function handleNewMessage(e: any) {
		setNewMessage(e.target.value);
	}

	function sendMessage() {
		if (newMessage.length === 0) {
			return;
		}

		return chatManager.sendMessage(id, newMessage)
			.then(_ => {
				setNewMessage('');
			})
	}

	if (loadingMessages) {
		return <LoadingPage isOpen={loadingMessages} />
	}

	if (errMessages) {
		return <ErrorPage message={errMessages.message as string} />
	}

	if (!authManager.user) {
		return null
	}

	return (
		<IonPage>
			<IonContent>
				<IonHeader>
					<IonToolbar>
						<IonTitle className="chat-title">Chat Box</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonList className="chat-list">
					{(messages || []).map(data => {
						const currUser = users.find(y => y.uid === data.creatorId);
						
						const slot = currUser && currUser.uid === authManager.user!.uid
							? 'end'
							: 'start';

						if (!currUser) {
							return <div key={data.id}></div>
						}

						return (
							<IonItem key={data.id}>
								<IonAvatar slot={slot}>
										<img src={currUser.image || assets.anonym} className="chat-img" alt="chat-img" />
								</IonAvatar>

								<IonLabel style={slot === 'start' ? { textAlign: 'left' } : { textAlign: 'right' }}>
										{slot === 'start' && <h5>{currUser.firstName} {currUser.lastName}</h5>}

										<h3>{data.message}</h3>
								</IonLabel>
						</IonItem>
						)
					})}

					<div ref={chatListEnd} />
				</IonList>

				<IonItem className="message-input" color="primary">
					<IonInput type="text" placeholder="Write message!" value={newMessage} onIonChange={handleNewMessage} />

					<IonIcon md={sendOutline} ios={sendOutline} onClick={sendMessage} />
				</IonItem>
			</IonContent>
		</IonPage>
	);
})
