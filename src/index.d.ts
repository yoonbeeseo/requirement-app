interface Notification {
  id: string; // 해당 노티피케이션 아이디
  followingId: string | null; // 내가 팔로우 한 사람의 아이디 //! 내가 팔로우 할 때
  followerId: string | null; //? 내가 팔로잉 당할때는 ?
  created_at: Date;
  isRead: boolean; // 읽음 여부 판단
}

//! 내가 팔로우할 때
const followingNotification1: Notification = {
  id: "asdfaf",
  followingId: "follow 할사람의 id",
  followerId: null,
  created_at: new Date(),
  isRead: false,
};

const getRef = (uid: string) =>
  dbService
    .collection(FBCollection.USERS)
    .doc(uid)
    .collection(FBCollection.NOTIFICATION);

const ref1 = getRef("my id").add(followingNotification1);

//! 내가 팔로우 한 사람에게 갈 때
const followingNotification2: Notification = {
  id: "asdfafㅗㅎ롷롷ㄹ",
  followingId: null,
  followerId: "my id",
  created_at: new Date(),
  isRead: false,
};

const ref2 = dbService
  .collection(FBCollection.USERS)
  .doc("follow 할 사람의 id")
  .collection(FBCollection.NOTIFICATION)
  .add(followingNotification1);

const url = `/post/${postId}`;
