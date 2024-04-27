import s from "./Contacts.module.css";

function Contacts() {
  return (
    <div className={s.section}>
      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#13C230" }}
      >
        WhatsApp
      </button>
      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#99A0F8" }}
      >
        Email
      </button>
      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#4793D0" }}
      >
        Telegram
      </button>
      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#2D69C9" }}
      >
        LinkedIn
      </button>
      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#EAB90A" }}
      >
        IMDB
      </button>
      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#FF0101" }}
      >
        YouTube
      </button>
      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#CD1CFB" }}
      >
        Instagram
      </button>

      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#1FD861" }}
      >
        Spotify
      </button>
      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#FC526A" }}
      >
        Apple Music
      </button>
      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#FFDB4A" }}
      >
        Yandex Music
      </button>

      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#FFFFFF" }}
      >
        VEVO
      </button>

      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#963EF6" }}
      >
        Deezer
      </button>
      <button
        className={s.contactsButton}
        style={{ backgroundColor: "#65CFD9" }}
      >
        Amazon music
      </button>
    </div>
  );
}

export default Contacts;
