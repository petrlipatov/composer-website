import s from "./SoundSpecs.module.css";

function SoundSpecs() {
  return (
    <div className={s.section}>
      <div className={""}>
        {/* <h3 className={s.subHeading}>Plugins and Instruments licenses</h3> */}
        <h3 className={s.subHeading}>Licenses</h3>
        <ul className={s.list}>
          <li className={s.item}>FabFilter</li>
          <li className={s.item}>Softube</li>
          <li className={s.item}>Universal Audio</li>
          <li className={s.item}>New Fangled Audio</li>
          <li className={s.item}>SoundToys</li>
          <li className={s.item}>IZotope</li>
          <li className={s.item}>Slate Digital</li>
          <li className={s.item}>Valhalla</li>
          <li className={s.item}>BrainWorx (Plugin Alliance)</li>
          <li className={s.item}>Tokyo Dawn Labs</li>
          <li className={s.item}>Spitfire Audio</li>
          <li className={s.item}>SAMPROJECT</li>
          <li className={s.item}>Native Instruments</li>
          <li className={s.item}>Orchestral Tools</li>
          <li className={s.item}>Crow Hill</li>
        </ul>

        {/* <ul className={s.list}>
          <li className={s.item}>Arturia</li>
          <li className={s.item}>Waves</li>
          <li className={s.item}>SugarBytes</li>
          <li className={s.item}>Dada Life</li>
        </ul> */}
      </div>
      <div>
        <h3 className={s.subHeading}>Gear</h3>
        <ul className={s.list}>
          <li className={s.item}>UAD Apollo</li>
          <li className={s.item}>RME</li>
          <li className={s.item}>Martin</li>
          <li className={s.item}>Fender</li>
          <li className={s.item}>Yamaha</li>
          <li className={s.item}>Genelec</li>
          <li className={s.item}>NEUMANN TLM 1103</li>
          <li className={s.item}>sE4400 Oktava</li>
          <li className={s.item}>Macbook Pro M1 MAX</li>
        </ul>
      </div>
    </div>
  );
}

export default SoundSpecs;
