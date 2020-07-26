import React from "react";
import PieceOption from "./PieceOption";

export const AvatarForm = () => {
  return (
    <form className="form-horizontal">
      <div className="row form-group">
        <label htmlFor="avatar-style" className="col-sm-3 control-label">
          Avatar Style
        </label>
        <div className="col-sm-9">
          <label>
            <input
              type="radio"
              id="avatar-style-circle"
              name="avatar-style"
              value="Circle"
            />{" "}
            Circle
          </label>
          <label>
            <input
              type="radio"
              id="avatar-style-transparent"
              name="avatar-style"
              value="Transparent"
            />{" "}
            Transparent
          </label>
        </div>
      </div>
      <div className="row form-group">
        <label htmlFor="topType" className="col-sm-3 control-label">
          Top
        </label>
        <div className="col-sm-9">
          <select id="topType" className="form-control">
            <option value="Eyepatch">Eyepatch</option>
            <option value="Turban">Turban</option>
            <option value="Hat">Hat</option>
            <option value="Hijab">Hijab</option>
            <option value="NoHair">NoHair</option>
            <option value="WinterHat1">WinterHat1</option>
            <option value="WinterHat2">WinterHat2</option>
            <option value="WinterHat3">WinterHat3</option>
            <option value="WinterHat4">WinterHat4</option>
            <option value="LongHairBigHair">LongHairBigHair</option>
            <option value="LongHairBob">LongHairBob</option>
            <option value="LongHairBun">LongHairBun</option>
            <option value="LongHairCurly">LongHairCurly</option>
            <option value="LongHairCurvy">LongHairCurvy</option>
            <option value="LongHairDreads">LongHairDreads</option>
            <option value="LongHairFrida">LongHairFrida</option>
            <option value="LongHairFro">LongHairFro</option>
            <option value="LongHairFroBand">LongHairFroBand</option>
            <option value="LongHairNotTooLong">LongHairNotTooLong</option>
            <option value="LongHairShavedSides">LongHairShavedSides</option>
            <option value="LongHairMiaWallace">LongHairMiaWallace</option>
            <option value="LongHairStraight">LongHairStraight</option>
            <option value="LongHairStraight2">LongHairStraight2</option>
            <option value="LongHairStraightStrand">
              LongHairStraightStrand
            </option>
            <option value="ShortHairDreads01">ShortHairDreads01</option>
            <option value="ShortHairDreads02">ShortHairDreads02</option>
            <option value="ShortHairFrizzle">ShortHairFrizzle</option>
            <option value="ShortHairShaggyMullet">ShortHairShaggyMullet</option>
            <option value="ShortHairShortCurly">ShortHairShortCurly</option>
            <option value="ShortHairShortFlat">ShortHairShortFlat</option>
            <option value="ShortHairShortRound">ShortHairShortRound</option>
            <option value="ShortHairShortWaved">ShortHairShortWaved</option>
            <option value="ShortHairSides">ShortHairSides</option>
            <option value="ShortHairTheCaesar">ShortHairTheCaesar</option>
            <option value="ShortHairTheCaesarSidePart">
              ShortHairTheCaesarSidePart
            </option>
          </select>
        </div>
      </div>
      <div className="row form-group">
        <label htmlFor="accessoriesType" className="col-sm-3 control-label">
          ↳ 👓 Accessories
        </label>
        <div className="col-sm-9">
          <select id="accessoriesType" className="form-control">
            <option value="Blank">Blank</option>
            <option value="Kurt">Kurt</option>
            <option value="Prescription01">Prescription01</option>
            <option value="Prescription02">Prescription02</option>
            <option value="Round">Round</option>
            <option value="Sunglasses">Sunglasses</option>
            <option value="Wayfarers">Wayfarers</option>
          </select>
        </div>
      </div>
      <div className="row form-group">
        <label htmlFor="facialHairType" className="col-sm-3 control-label">
          Facial Hair
        </label>
        <div className="col-sm-9">
          <select id="facialHairType" className="form-control">
            <option value="Blank">Blank</option>
            <option value="BeardMedium">BeardMedium</option>
            <option value="BeardLight">BeardLight</option>
            <option value="BeardMagestic">BeardMagestic</option>
            <option value="MoustacheFancy">MoustacheFancy</option>
            <option value="MoustacheMagnum">MoustacheMagnum</option>
          </select>
        </div>
      </div>
      <div className="row form-group">
        <label htmlFor="facialHairColor" className="col-sm-3 control-label">
          ↳ ✂️ Facial Hair Color
        </label>
        <div className="col-sm-9">
          <select id="facialHairColor" className="form-control">
            <option value="Auburn">Auburn</option>
            <option value="Black">Black</option>
            <option value="Blonde">Blonde</option>
            <option value="BlondeGolden">BlondeGolden</option>
            <option value="Brown">Brown</option>
            <option value="BrownDark">BrownDark</option>
            <option value="Platinum">Platinum</option>
            <option value="Red">Red</option>
          </select>
        </div>
      </div>
      <div className="row form-group">
        <label htmlFor="clotheType" className="col-sm-3 control-label">
          👔 Clothes
        </label>
        <div className="col-sm-9">
          <select id="clotheType" className="form-control">
            <option value="BlazerShirt">BlazerShirt</option>
            <option value="BlazerSweater">BlazerSweater</option>
            <option value="CollarSweater">CollarSweater</option>
            <option value="GraphicShirt">GraphicShirt</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Overall">Overall</option>
            <option value="ShirtCrewNeck">ShirtCrewNeck</option>
            <option value="ShirtScoopNeck">ShirtScoopNeck</option>
            <option value="ShirtVNeck">ShirtVNeck</option>
          </select>
        </div>
      </div>
      <div className="row form-group">
        <label htmlFor="clotheColor" className="col-sm-3 control-label">
          ↳ Color Fabric
        </label>
        <div className="col-sm-9">
          <select id="clotheColor" className="form-control">
            <option value="Black">Black</option>
            <option value="Blue01">Blue01</option>
            <option value="Blue02">Blue02</option>
            <option value="Blue03">Blue03</option>
            <option value="Gray01">Gray01</option>
            <option value="Gray02">Gray02</option>
            <option value="Heather">Heather</option>
            <option value="PastelBlue">PastelBlue</option>
            <option value="PastelGreen">PastelGreen</option>
            <option value="PastelOrange">PastelOrange</option>
            <option value="PastelRed">PastelRed</option>
            <option value="PastelYellow">PastelYellow</option>
            <option value="Pink">Pink</option>
            <option value="Red">Red</option>
            <option value="White">White</option>
          </select>
        </div>
      </div>
      <div className="row form-group">
        <label htmlFor="eyeType" className="col-sm-3 control-label">
          👁 Eyes
        </label>
        <div className="col-sm-9">
          <select id="eyeType" className="form-control">
            <option value="Close">Close</option>
            <option value="Cry">Cry</option>
            <option value="Default">Default</option>
            <option value="Dizzy">Dizzy</option>
            <option value="EyeRoll">EyeRoll</option>
            <option value="Happy">Happy</option>
            <option value="Hearts">Hearts</option>
            <option value="Side">Side</option>
            <option value="Squint">Squint</option>
            <option value="Surprised">Surprised</option>
            <option value="Wink">Wink</option>
            <option value="WinkWacky">WinkWacky</option>
          </select>
        </div>
      </div>
      <div className="row form-group">
        <label htmlFor="eyebrowType" className="col-sm-3 control-label">
          ✏️ Eyebrow
        </label>
        <div className="col-sm-9">
          <select id="eyebrowType" className="form-control">
            <option value="Angry">Angry</option>
            <option value="AngryNatural">AngryNatural</option>
            <option value="Default">Default</option>
            <option value="DefaultNatural">DefaultNatural</option>
            <option value="FlatNatural">FlatNatural</option>
            <option value="RaisedExcited">RaisedExcited</option>
            <option value="RaisedExcitedNatural">RaisedExcitedNatural</option>
            <option value="SadConcerned">SadConcerned</option>
            <option value="SadConcernedNatural">SadConcernedNatural</option>
            <option value="UnibrowNatural">UnibrowNatural</option>
            <option value="UpDown">UpDown</option>
            <option value="UpDownNatural">UpDownNatural</option>
          </select>
        </div>
      </div>
      <div className="row form-group">
        <label htmlFor="mouthType" className="col-sm-3 control-label">
          👄 Mouth
        </label>
        <div className="col-sm-9">
          <select id="mouthType" className="form-control">
            <option value="Concerned">Concerned</option>
            <option value="Default">Default</option>
            <option value="Disbelief">Disbelief</option>
            <option value="Eating">Eating</option>
            <option value="Grimace">Grimace</option>
            <option value="Sad">Sad</option>
            <option value="ScreamOpen">ScreamOpen</option>
            <option value="Serious">Serious</option>
            <option value="Smile">Smile</option>
            <option value="Tongue">Tongue</option>
            <option value="Twinkle">Twinkle</option>
            <option value="Vomit">Vomit</option>
          </select>
        </div>
      </div>
      <div className="row form-group">
        <label htmlFor="skinColor" className="col-sm-3 control-label">
          🎨 Skin
        </label>
        <div className="col-sm-9">
          <select id="skinColor" className="form-control">
            <option value="Tanned">Tanned</option>
            <option value="Yellow">Yellow</option>
            <option value="Pale">Pale</option>
            <option value="Light">Light</option>
            <option value="Brown">Brown</option>
            <option value="DarkBrown">DarkBrown</option>
            <option value="Black">Black</option>
          </select>
        </div>
      </div>
      <div className="row form-group">
        <div className="offset-sm-3 col-sm-9 col-sm-offset-3">
          More options coming soon,{" "}
          <a href="http://eepurl.com/c_7fN9" target="_blank">
            subscribe for updates
          </a>
        </div>
      </div>
      <div className="row form-group">
        <div className="offset-sm-3 col-sm-9 col-sm-offset-3">
          <button type="submit" className="btn btn-primary">
            <i className="fa fa-download" /> PNG
          </button>{" "}
          <button type="submit" className="btn btn-secondary">
            <i className="fa fa-download" /> SVG
          </button>{" "}
          <button type="submit" className="btn btn-secondary">
            <i className="fa fa-code" /> Hide React
          </button>{" "}
          <button type="submit" className="btn btn-secondary">
            <i className="fa fa-code" /> Show &lt;img&gt;
          </button>
          <div style={{ marginTop: "10px" }}>
            <iframe
              src="https://platform.twitter.com/widgets/tweet_button.html?text=I%20just%20created%20my%20avataaars%20here%20%F0%9F%98%86&amp;url=https%3A%2F%2Fgetavataaars.com%2F%3FaccessoriesType%3DPrescription01%26avatarStyle%3DTransparent%26clotheColor%3DBlue03%26clotheType%3DShirtScoopNeck%26eyeType%3DDizzy%26eyebrowType%3DSadConcernedNatural%26facialHairColor%3DPlatinum%26facialHairType%3DMoustacheMagnum%26graphicType%3DSelena%26hairColor%3DRed%26hatColor%3DPastelYellow%26mouthType%3DScreamOpen%26skinColor%3DPale%26topType%3DHat&amp;hashtags=avataaars%2Cavatar&amp;size=l&amp;lang=en"
              width="140"
              height="28"
              title="Twitter Tweet Button"
              style={{ border: "0px", overflow: "hidden" }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AvatarForm;
