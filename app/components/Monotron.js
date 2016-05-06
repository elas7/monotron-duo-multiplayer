import React from 'react';
import Toggle from './Toggle';
import Knob from './Knob';
import KeyboardContainer from '../containers/Keyboard';

/**
 * Monotron Component.
 */
export default function Monotron({knobs, dragging, onMouseDownKnob}) {

  // static part of the SVG that makes the Monotron.
  let staticSvg = (
    <g className="staticSvg">
      <path fill="#2D2D2F" d="M605.1,574.5H4.9c-2.7,0-4.9-2.2-4.9-4.9V220.5c0-2.7,2.2-4.9,4.9-4.9H605c2.7,0,4.9,2.2,4.9,4.9v349.1C610,572.3,607.9,574.5,605.1,574.5z"/>
      <rect x="14.4" y="215.5" fill="#274F70" width="580.6" height="358.7"/>
      <path fill="#274F70" stroke="#E6E7E8" stroke-miterlimit="10" d="M40.9,446.6V263.7c0,0,1.6-5.8,5.1-5.8s232.9,0,232.9,0l75.9,85.8h207.4c0,0,3.7,0.6,3.7,3.7s0,99,0,99h-525L40.9,446.6L40.9,446.6z"/>
      <path fill="#2D2D2F" d="M358.5,338L358.5,338c-1.6-1.4-2-3.7-0.6-5.3l70.6-90c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-70.8,90C362.5,339,360.1,339.4,358.5,338z"/>
      <path fill="#F0F0F2" d="M162,361.2l-4.5-12.1h2.7l3.2,9l3.1-9h2.7l-4.5,12.1H162z"/>
      <path fill="#F0F0F2" d="M178.4,356.7l2.4,0.8c-0.4,1.3-1,2.3-1.9,2.9s-2,1-3.3,1c-1.7,0-3-0.5-4.1-1.6s-1.6-2.6-1.6-4.5c0-2,0.5-3.6,1.6-4.7s2.5-1.7,4.2-1.7c1.5,0,2.8,0.4,3.7,1.3c0.6,0.5,1,1.3,1.3,2.2l-2.5,0.6c-0.1-0.6-0.5-1.1-0.9-1.5c-0.5-0.4-1-0.5-1.7-0.5c-0.9,0-1.7,0.3-2.2,1c-0.6,0.6-0.9,1.7-0.9,3.1c0,1.5,0.3,2.6,0.9,3.3s1.3,1,2.2,1c0.7,0,1.2-0.2,1.7-0.6S178.2,357.6,178.4,356.7z"/>
      <path fill="#F0F0F2" d="M182.5,355.2c0-1.2,0.2-2.3,0.6-3.1c0.3-0.6,0.7-1.2,1.2-1.7s1-0.9,1.6-1.1c0.8-0.3,1.7-0.5,2.7-0.5c1.8,0,3.3,0.6,4.4,1.7c1.1,1.1,1.7,2.6,1.7,4.6s-0.5,3.5-1.6,4.6s-2.6,1.7-4.4,1.7c-1.9,0-3.3-0.5-4.4-1.6C183,358.6,182.5,357.1,182.5,355.2z M185.1,355.1c0,1.4,0.3,2.4,1,3.1s1.5,1.1,2.5,1.1s1.8-0.4,2.5-1.1c0.6-0.7,1-1.8,1-3.2c0-1.4-0.3-2.4-0.9-3.1c-0.6-0.7-1.5-1-2.5-1s-1.9,0.3-2.5,1C185.4,352.7,185.1,353.7,185.1,355.1z"/>
      <path fill="#F0F0F2" d="M202.1,361.2h-2.4v-8.8c-0.9,0.8-1.9,1.4-3.1,1.8v-2.1c0.6-0.2,1.3-0.6,2-1.1c0.7-0.6,1.2-1.2,1.5-1.9h1.9v12.1H202.1z"/>
      <path fill="#2D2D2F" d="M378.7,338L378.7,338c-1.6-1.4-2-3.7-0.6-5.3l70.6-90c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-70.6,90C382.8,339,380.3,339.4,378.7,338z"/>
      <path fill="#2D2D2F" d="M398.1,338L398.1,338c-1.6-1.4-2-3.7-0.6-5.3l70.8-90c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-70.8,90C402.2,339,399.8,339.4,398.1,338z"/>
      <path fill="#2D2D2F" d="M419.2,338L419.2,338c-1.6-1.4-2-3.7-0.6-5.3l70.8-90c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-70.8,90C423.3,339,420.9,339.4,419.2,338z"/>
      <path fill="#2D2D2F" d="M439.2,338L439.2,338c-1.6-1.4-2-3.7-0.6-5.3l70.8-90c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-70.8,90C443.3,339,441,339.4,439.2,338z"/>
      <path fill="#2D2D2F" d="M459.4,338L459.4,338c-1.6-1.4-2-3.7-0.6-5.3l70.6-90c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-70.8,90C463.3,339,461,339.4,459.4,338z"/>
      <path fill="#2D2D2F" d="M479.9,338L479.9,338c-1.6-1.4-2-3.7-0.6-5.3l70.8-90c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-70.6,90C483.9,339,481.6,339.4,479.9,338z"/>
      <path fill="#2D2D2F" d="M499.9,338L499.9,338c-1.6-1.4-2-3.7-0.6-5.3l60.6-77.2c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-60.6,77.2C503.9,339,501.5,339.4,499.9,338z"/>
      <path fill="#2D2D2F" d="M520,338L520,338c-1.6-1.4-2-3.7-0.6-5.3l40.1-51.1c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-40.1,51.1C524.1,339,521.7,339.4,520,338z"/>
      <path fill="#2D2D2F" d="M540.2,338L540.2,338c-1.6-1.4-2-3.7-0.6-5.3l20.1-25.7c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-20.1,25.7C544.2,339,541.8,339.4,540.2,338z"/>
      <path fill="#2D2D2F" d="M347.2,326.9L347.2,326.9c-1.6-1.4-2-3.7-0.6-5.3l62-78.9c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-62,78.9C351.3,327.9,349,328.1,347.2,326.9z"/>
      <path fill="#2D2D2F" d="M336.7,314.6L336.7,314.6c-1.6-1.4-2-3.7-0.6-5.3l52.2-66.6c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3L342,313.9C340.8,315.5,338.5,315.8,336.7,314.6z"/>
      <path fill="#2D2D2F" d="M325.5,302.5L325.5,302.5c-1.6-1.4-2-3.7-0.6-5.3l42.8-54.5c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-42.7,54.5C329.6,303.6,327.2,303.8,325.5,302.5z"/>
      <path fill="#2D2D2F" d="M314.8,291L314.8,291c-1.6-1.4-2-3.7-0.6-5.3l33.7-43c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-33.7,43C318.8,292,316.4,292.3,314.8,291z"/>
      <path fill="#2D2D2F" d="M304,278.4L304,278.4c-1.6-1.4-2-3.7-0.6-5.3l23.7-30.4c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-23.8,30.4C308,279.4,305.6,279.7,304,278.4z"/>
      <path fill="#2D2D2F" d="M294,266L294,266c-1.6-1.4-2-3.7-0.6-5.3l14.1-18c1.4-1.6,3.7-2,5.3-0.6l0,0c1.6,1.4,2,3.7,0.6,5.3l-14.2,18C298.1,267,295.6,267.4,294,266z"/>
      <line fill="none" stroke="#EEEFF0" stroke-miterlimit="10" x1="53.7" y1="338.9" x2="338.3" y2="338.9"/>
      <circle fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" cx="180.2" cy="393.7" r="16.3"/>
      <path fill="none" stroke="#EEEFF0" stroke-miterlimit="10" d="M165.7,368.5l4.1,6.9 M163.5,376.4l2.1,2.1 M162.1,383l-6.8-4L162.1,383 M159.9,388l-2.7-0.7L159.9,388 M159.2,393.7h-7.9H159.2 M159.8,398.9l-2.7,0.7L159.8,398.9 M162.1,404.3l-6.8,4L162.1,404.3 M165.5,408.6l-2.1,2.1L165.5,408.6 M169.9,412l-4,6.9L169.9,412 M191,411.7l4.2,7.2L191,411.7 M195.1,408.5l2.3,2.3L195.1,408.5 M198.4,404.1l7.2,4.2L198.4,404.1 M200.5,399.1l3.2,0.9L200.5,399.1 M201.3,393.7h8.4H201.3 M200.5,388.5l3.2-0.9L200.5,388.5 M198.4,383.2l7.2-4.2L198.4,383.2 M195.2,378.9l2.3-2.3L195.2,378.9 M190.9,375.6l4.1-7.2L190.9,375.6 M186.1,373.5l0.9-3.1L186.1,373.5 M180.4,364.4v8.1 M174.2,370.2l0.7,3"/>
      <circle fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" cx="347.5" cy="393.7" r="16.3"/>
      <path fill="none" stroke="#EEEFF0" stroke-miterlimit="10" d="M333,368.5l4.1,6.9 M330.8,376.4l2.1,2.1 M329.4,383l-6.8-4L329.4,383M327.2,388l-2.7-0.7L327.2,388 M326.5,393.7h-7.9H326.5 M327.1,398.9l-2.7,0.7L327.1,398.9 M329.4,404.3l-6.8,4L329.4,404.3M332.8,408.6l-2.1,2.1L332.8,408.6 M337.2,412l-4,6.9L337.2,412 M358.3,411.7l4.2,7.2L358.3,411.7 M362.4,408.5l2.3,2.3L362.4,408.5 M365.8,404.1l7.2,4.2L365.8,404.1 M367.9,399.1l3.2,0.9L367.9,399.1 M368.6,393.7h8.4H368.6 M367.9,388.5l3.2-0.9L367.9,388.5 M365.8,383.2l7.2-4.2L365.8,383.2 M362.5,378.9l2.3-2.3L362.5,378.9 M358.2,375.6l4.1-7.2L358.2,375.6 M353.4,373.5l0.9-3.1L353.4,373.5 M347.7,364.4v8.1 M341.6,370.2l0.7,3"/>
      <circle fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" cx="431.6" cy="393.7" r="16.3"/>
      <path fill="none" stroke="#EEEFF0" stroke-miterlimit="10" d="M417.1,368.5l4.1,6.9 M414.9,376.4l2.1,2.1 M413.4,383l-6.8-4L413.4,383 M411.3,388l-2.7-0.7L411.3,388 M410.5,393.7h-7.9H410.5 M411.2,398.9l-2.7,0.7L411.2,398.9 M413.4,404.3l-6.8,4L413.4,404.3 M416.8,408.6l-2.1,2.1L416.8,408.6 M421.3,412l-4,6.9L421.3,412 M442.4,411.7l4.2,7.2L442.4,411.7 M446.5,408.5l2.3,2.3L446.5,408.5 M449.8,404.1l7.2,4.2L449.8,404.1 M451.8,399.1l3.2,0.9L451.8,399.1 M452.7,393.7h8.4H452.7 M451.9,388.5l3.2-0.9L451.9,388.5 M449.8,383.2l7.2-4.2L449.8,383.2 M446.6,378.9l2.3-2.3L446.6,378.9 M442.3,375.6l4.1-7.2L442.3,375.6M437.5,373.5l0.9-3.1L437.5,373.5 M431.8,364.4v8.1 M425.6,370.2l0.7,3"/>
      <circle fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" cx="514.3" cy="393.7" r="16.3"/>
      <path fill="none" stroke="#EEEFF0" stroke-miterlimit="10" d="M499.9,368.5l4.1,6.9 M497.6,376.4l2.1,2.1 M496.1,383l-6.8-4L496.1,383 M494.1,388l-2.7-0.7L494.1,388 M493.2,393.7h-7.9H493.2 M493.9,398.9l-2.7,0.7L493.9,398.9 M496.1,404.3l-6.8,4L496.1,404.3 M499.5,408.6l-2.1,2.1L499.5,408.6 M504.1,412l-4,6.9L504.1,412 M525.2,411.7l4.2,7.2L525.2,411.7 M529.2,408.5l2.3,2.3L529.2,408.5 M532.6,404.1l7.2,4.2L532.6,404.1 M534.6,399.1l3.2,0.9L534.6,399.1 M535.4,393.7h8.4H535.4 M534.7,388.5l3.2-0.9L534.7,388.5 M532.6,383.2l7.2-4.2L532.6,383.2 M529.4,378.9l2.3-2.3L529.4,378.9 M525,375.6l4.1-7.2L525,375.6M520.2,373.5l0.9-3.1L520.2,373.5 M514.5,364.4v8.1 M508.4,370.2l0.7,3"/>
      <path fill="#FDC662" d="M295.7,426.7h-63.6c-1.7,0-3.1-1.4-3.1-3.1v-71c0-1.7,1.4-3.1,3.1-3.1h63.6c1.7,0,3.1,1.4,3.1,3.1v71C298.8,425.3,297.5,426.7,295.7,426.7z"/>
      <path fill="#374F69" d="M102.5,482.2h405l14.3-14.9c-1.1-1.1-2.6-1.7-4.2-1.7H91.1c-1.6,0-3.1,0.6-4.2,1.7L102.5,482.2z"/>
      <path fill="#5C6E8C" d="M507.5,482.2v48.2l14.3,14.9c1.1-1.1,1.7-2.6,1.7-4.2v-69.5c0-1.6-0.6-3.1-1.7-4.2L507.5,482.2z"/>
      <path fill="#6F8096" d="M521.8,545.3l-14.3-14.9h-405l-15.6,14.9c1.1,1.1,2.6,1.7,4.2,1.7h426.4C519.2,547.1,520.7,546.3,521.8,545.3z"/>
      <path fill="#5C6E8C" d="M86.9,545.3l15.6-14.9v-48.2l-15.6-14.9c-1.1,1.1-1.7,2.6-1.7,4.2V541C85.2,542.7,85.9,544.2,86.9,545.3z"/>
      <circle fill="#FFFFFF" stroke="#414042" stroke-width="0.5" stroke-miterlimit="10" cx="264" cy="393.7" r="16.3"/>
      <path fill="#F0F0F2" d="M258.5,294.6c-2.1,5.2-4.5,6.9-8.9,6.2c-4.3-0.6-5.7-2.5-6.4-8.4c-1.3,1.4-2.6,3-4.1,4.3c-2.1,1.8-4.6,3-7.3,3.2c-5.4,0.4-10.8,0.4-16.4,0.6c0.8-2,1.5-3.6,2.1-5.2c2.5-6.1,5-12.2,7.5-18.3c0.4-0.9,0.8-1.2,1.8-1.2c3.2,0.2,6.4,0.1,9.5,0.7c4,0.7,7,2.9,8,7.1c0.1,0.3,0.7,0.7,1.1,0.7c0.8,0.1,1.7,0,2.8,0c0,1.1,0,2.1,0,3.2c0.1,2.3,0.1,4.7,0.2,7c0.1,1.4,1.2,1.8,2.5,1.8c1.2,0,2.2-0.4,2.4-1.8c0.2-1.5,0.2-3,0.2-4.5c0-1.8,0-3.7,0-5.6c1.6,0,3.2,0,4.8,0c0,1.8,0,3.6,0,5.4c0.1,0,0.2,0,0.2,0.1c0.2-0.3,0.3-0.7,0.5-1c1.7-3.3,5.5-5.3,9.5-4.9c3.9,0.4,7,2.9,7.9,6.3c1.2,4.5-1.8,9.1-6.5,10.2C266,301.5,260.6,300.2,258.5,294.6z M223.4,295.7c3,0.5,7.6,0.1,10.1-0.8c3.1-1.1,5.1-3.2,5.8-6.5c0.9-3.7-0.6-6.3-4.3-7.3c-1.5-0.4-3.1-0.5-4.7-0.6c-0.3,0-0.9,0.3-1,0.5C227.3,285.8,225.4,290.7,223.4,295.7z M267.6,296.4c2.3,0,4.3-1.8,4.3-3.9c0-2.2-2-4-4.4-3.9c-2.4,0-4.3,1.7-4.3,3.8C263.1,294.5,265.2,296.4,267.6,296.4z"/>
      <path fill="#F0F0F2" d="M53.7,306.7c0.7,0,1.3,0,1.9,0c9.8,0,19.6,0,29.4,0c0.4,0,0.8,0,1.2,0c3.8,0.1,4.7,1.2,4.7,4.9  c0,2.9,0,5.9,0,9c-1.5,0-2.8,0-4.4,0c0-1.9,0-3.8,0-5.7c0-1.7-0.2-3.5-0.3-5.2c-1.7-0.1-3.5-0.2-5.2-0.2c-1.3,0-2.7,0-4,0  c-2.4,0-2.4,0-2.4,2.3c0,2.9,0,5.8,0,8.8c-1.4,0-2.7,0-4.2,0c0-0.5-0.1-1-0.1-1.5c0-2.6,0-5.2,0-7.8c0-1.2-0.4-1.8-1.7-1.8  c-3,0.1-6,0.1-9,0c-1.2,0-1.7,0.4-1.7,1.7c0.1,2.6,0,5.2,0,7.8c0,0.5,0,1.1,0,1.7c-1.5,0-2.8,0-4.3,0  C53.7,316.1,53.7,311.5,53.7,306.7z"/>
      <path fill="#F0F0F2" d="M232.9,306.9c3.2,0,6.4-0.1,9.6,0c2.4,0.1,3.6,1.2,3.7,3.6c0.1,2.1,0.1,4.3,0,6.4c-0.1,2.4-1.3,3.6-3.7,3.7  c-6.4,0.1-12.8,0.1-19.2,0c-2.5,0-3.6-1.5-3.7-4c0-1.9,0-3.9,0-5.8c0-2.4,1.2-3.8,3.6-3.9C226.5,306.8,229.7,306.9,232.9,306.9  L232.9,306.9z M233.2,309.5c-2.5,0-5.1,0-7.6,0c-1,0-1.4,0.4-1.4,1.4c0,1.9,0,3.8,0,5.7c0,0.9,0.4,1.4,1.3,1.4c5,0,10,0,15,0  c1,0,1.5-0.4,1.5-1.4c0-1.8,0-3.7,0-5.5c0-1.1-0.5-1.5-1.5-1.5C237.9,309.5,235.6,309.5,233.2,309.5z"/>
      <path fill="#F0F0F2" d="M108.1,320.7c-2.9,0-5.9,0.1-8.8,0c-3.1-0.1-4.3-1.3-4.3-4.3c0-1.8-0.1-3.7,0-5.5c0.1-2.7,1.2-3.8,3.9-3.9  c3.9-0.1,7.8-0.1,11.7-0.1c2.3,0,4.7,0,7,0.1c2.8,0.2,3.9,1.4,3.9,4.2c0,1.7,0,3.5,0,5.2c0,3-1.2,4.3-4.2,4.4  C114.2,320.7,111.1,320.7,108.1,320.7z M108.1,318c2.5,0,5,0,7.5,0c1,0,1.5-0.4,1.5-1.4c0-1.9,0-3.8,0-5.7c0-0.9-0.3-1.4-1.3-1.4  c-5,0-10.1,0-15.1,0c-0.9,0-1.3,0.5-1.3,1.4c0,1.8,0.1,3.6,0,5.4c-0.1,1.3,0.5,1.7,1.8,1.7C103.4,318,105.7,318,108.1,318z"/>
      <path fill="#F0F0F2" d="M169.4,320.7c-3,0-6,0.1-9,0c-3.2-0.1-4.4-1.3-4.4-4.5c0-1.7,0-3.4,0-5.1c0-2.8,1.1-4,3.9-4.2  c3.3-0.1,6.7-0.1,10-0.1c2.9,0,5.8,0,8.7,0.1c2.7,0.1,3.8,1.3,3.8,4c0.1,1.9,0.1,3.8,0,5.7c-0.1,2.9-1.2,4.1-4.2,4.1  C175.4,320.7,172.4,320.7,169.4,320.7L169.4,320.7z M169.2,318c2.5,0,5,0,7.5,0c1.1,0,1.6-0.5,1.5-1.5c0-1.8,0-3.6,0-5.4  c0-1-0.4-1.6-1.5-1.6c-5,0-10,0-15,0c-1,0-1.3,0.4-1.3,1.4c0,1.8,0,3.7,0,5.5c0,1.1,0.4,1.6,1.6,1.6C164.4,318,166.8,318,169.2,318  z"/>
      <path fill="#F0F0F2" d="M130.1,320.7c-1.5,0-2.9,0-4.3,0c0-4.6,0-9.1,0-13.8c0.5,0,0.9-0.1,1.4-0.1c6.4,0,12.7,0,19.1,0  c5,0,5.8,0.9,5.8,5.8c0,2.6,0,5.3,0,8c-1.5,0-2.8,0-4.5,0c0-0.5,0-0.9,0-1.4c0-2.8,0-5.6,0-8.4c0-0.9-0.2-1.3-1.2-1.3  c-5,0-10,0-15,0c-1.1,0-1.3,0.6-1.3,1.5C130.2,314.2,130.1,317.3,130.1,320.7z"/>
      <path fill="#F0F0F2" d="M254.8,320.7c-1.5,0-2.8,0-4.2,0c0-4.6,0-9.1,0-13.8c0.5,0,0.9-0.1,1.4-0.1c6.4,0,12.7,0,19.1,0  c0.1,0,0.2,0,0.3,0c4.6,0.1,5.4,1,5.4,5.5c0,2.8,0,5.6,0,8.4c-1.5,0-2.8,0-4.4,0c0-1.6,0-3.1,0-4.6s0-2.9,0-4.4  c0-2.2,0-2.2-2.1-2.2c-4.5,0-9,0-13.5,0c-1.8,0-2,0.2-2,2C254.8,314.5,254.8,317.5,254.8,320.7z"/>
      <path fill="#F0F0F2" d="M191.1,303.6c0,1.1,0,2,0,3.1c1.8,0,3.6,0,5.3,0c2.5,0,2.5,0,2,2.7c-2.3,0-4.7,0-7.2,0c0,2.6-0.1,5,0.1,7.5  c0,0.4,0.9,1,1.4,1c2.1,0.1,4.2,0,6.3,0c0,0.9,0,1.7,0,2.9c-3.1-0.2-6.2-0.2-9.3-0.5c-1.9-0.2-2.8-1.7-2.9-3.8  c-0.1-3.9-0.1-7.9,0-11.8c0-0.3,0.5-0.9,0.9-1C188.7,303.6,189.8,303.6,191.1,303.6z"/>
      <path fill="#F0F0F2" d="M207.7,320.7c-1.6,0-3,0-4.5,0c0-3.4-0.2-6.7,0.1-10c0.1-2.1,1.8-3.4,3.9-3.6c3-0.2,6-0.1,9.1-0.1  c0,0.4,0,0.8,0.1,1.3c0.1,0.9-0.2,1.4-1.2,1.3c-1.5-0.1-3.1,0-4.7,0c-2.2,0-2.6,0.5-2.6,2.6C207.7,314.9,207.7,317.7,207.7,320.7z"/>
      <path fill="#F0F0F2" d="M223.7,276.1c-2.2,5.4-4.4,10.7-6.6,16.1c-1,2.4-2,4.8-3,7.2c-0.4,1-0.8,1.4-2,0.9c1.1-2.6,2.2-5.2,3.2-7.8  c2.1-5.1,4.3-10.2,6.3-15.3C222.1,276.1,222.5,275.7,223.7,276.1z"/>
      <path fill="#F0F0F2" d="M63.6,330.6h-2.1l-0.9-1.5h-4.2l-0.9,1.5h-1.7l3.7-6.3h2.4L63.6,330.6z M60,328.2l-1.6-2.8l-1.6,2.8H60z"/>
      <path fill="#F0F0F2" d="M73.2,330.6h-1.9l-4.2-4c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.2-0.2-0.3-0.3v4.6h-1.6v-6.3h2.2L71,328   c0,0,0.3,0.3,0.7,0.7v-4.4h1.6L73.2,330.6L73.2,330.6z"/>
      <path fill="#F0F0F2" d="M84.3,330.6h-2.1l-0.9-1.5H77l-0.9,1.5h-1.7l3.7-6.3h2.4L84.3,330.6z M80.7,328.2l-1.6-2.8l-1.6,2.8H80.7z   "/>
      <path fill="#F0F0F2" d="M92.4,330.6h-6.8v-6.3h2.1v5.3h4.7C92.4,329.6,92.4,330.6,92.4,330.6z"/>
      <path fill="#F0F0F2" d="M97.6,330.7c-1.5,0-2.6-0.3-3.4-0.9s-1.2-1.4-1.2-2.3s0.4-1.7,1.3-2.3c0.9-0.6,2-0.9,3.4-0.9   s2.6,0.3,3.4,0.9s1.2,1.4,1.2,2.3c0,1-0.4,1.8-1.3,2.4C100.2,330.4,99,330.7,97.6,330.7z M97.6,329.8c0.7,0,1.3-0.2,1.8-0.5   s0.7-1,0.7-1.9c0-0.7-0.2-1.3-0.6-1.7c-0.4-0.4-1-0.6-1.9-0.6c-1.7,0-2.5,0.8-2.5,2.4c0,0.8,0.2,1.3,0.6,1.7   C96.2,329.6,96.8,329.8,97.6,329.8z"/>
      <path fill="#F0F0F2" d="M112.5,327.4v3.2h-0.9l-0.6-0.9c-0.6,0.6-1.6,1-3,1c-1.5,0-2.6-0.3-3.4-1c-0.7-0.7-1.1-1.4-1.1-2.3   s0.4-1.7,1.2-2.3c0.8-0.6,2-0.9,3.5-0.9c1.1,0,2,0.2,2.7,0.6s1.2,0.8,1.4,1.4l-1.7,0.2c-0.3-0.8-1.1-1.2-2.3-1.2   c-0.8,0-1.4,0.2-1.9,0.5c-0.5,0.4-0.7,0.9-0.7,1.7c0,1.6,0.9,2.4,2.6,2.4c0.7,0,1.2-0.1,1.7-0.4c0.4-0.3,0.7-0.6,0.7-1.1h-2.3   v-0.9L112.5,327.4L112.5,327.4z"/>
      <path fill="#F0F0F2" d="M127.5,330.6h-2.1l-1.7-2.6h-2.8v2.6h-2v-6.3h4.8c1.3,0,2.3,0.2,2.9,0.5s0.9,0.8,0.9,1.3   c0,0.8-0.7,1.4-2,1.7L127.5,330.6z M120.9,327.1h2.5c0.7,0,1.2-0.1,1.6-0.3c0.3-0.2,0.5-0.4,0.5-0.7c0-0.3-0.2-0.5-0.5-0.7   s-0.8-0.3-1.4-0.3H121L120.9,327.1L120.9,327.1z"/>
      <path fill="#F0F0F2" d="M131.5,330.6h-2v-6.3h2V330.6z"/>
      <path fill="#F0F0F2" d="M133.9,330.6v-6.3h4.3c0.7,0,1.3,0,1.8,0.1s0.9,0.3,1.2,0.5c0.3,0.3,0.5,0.6,0.5,1c0,0.3-0.2,0.7-0.5,0.9   s-0.8,0.4-1.5,0.5c0.8,0.1,1.4,0.3,1.8,0.5c0.4,0.3,0.6,0.6,0.6,1c0,0.5-0.3,0.9-0.8,1.2c-0.6,0.3-1.4,0.5-2.6,0.5L133.9,330.6   L133.9,330.6z M135.8,326.9h2.4c0.5,0,0.9-0.1,1.2-0.3c0.3-0.2,0.4-0.4,0.4-0.6c0-0.3-0.2-0.5-0.5-0.6s-0.7-0.2-1.2-0.2h-2.4v1.7   H135.8z M135.8,329.6h2.6c0.5,0,1-0.1,1.3-0.2c0.3-0.2,0.5-0.4,0.5-0.7c0-0.3-0.2-0.5-0.5-0.7s-0.7-0.3-1.3-0.3h-2.6V329.6z"/>
      <path fill="#F0F0F2" d="M144,330.6v-6.3h4.3c0.7,0,1.3,0,1.8,0.1s0.9,0.3,1.2,0.5c0.3,0.3,0.5,0.6,0.5,1c0,0.3-0.2,0.7-0.5,0.9   s-0.8,0.4-1.5,0.5c0.8,0.1,1.4,0.3,1.8,0.5c0.4,0.3,0.6,0.6,0.6,1c0,0.5-0.3,0.9-0.8,1.2c-0.6,0.3-1.4,0.5-2.6,0.5L144,330.6   L144,330.6z M145.8,326.9h2.4c0.5,0,0.9-0.1,1.2-0.3c0.3-0.2,0.4-0.4,0.4-0.6c0-0.3-0.2-0.5-0.5-0.6s-0.7-0.2-1.2-0.2h-2.4v1.7   H145.8z M145.8,329.6h2.6c0.5,0,1-0.1,1.3-0.2c0.3-0.2,0.5-0.4,0.5-0.7c0-0.3-0.2-0.5-0.5-0.7s-0.7-0.3-1.3-0.3h-2.6V329.6z"/>
      <path fill="#F0F0F2" d="M158,330.7c-1.5,0-2.6-0.3-3.4-0.9c-0.8-0.6-1.2-1.4-1.2-2.3s0.4-1.7,1.3-2.3c0.9-0.6,2-0.9,3.4-0.9   s2.6,0.3,3.4,0.9c0.8,0.6,1.2,1.4,1.2,2.3c0,1-0.4,1.8-1.3,2.4C160.6,330.4,159.5,330.7,158,330.7z M158.1,329.8   c0.7,0,1.3-0.2,1.8-0.5s0.7-1,0.7-1.9c0-0.7-0.2-1.3-0.6-1.7c-0.4-0.4-1-0.6-1.9-0.6c-1.7,0-2.5,0.8-2.5,2.4   c0,0.8,0.2,1.3,0.6,1.7C156.6,329.6,157.3,329.8,158.1,329.8z"/>
      <path fill="#F0F0F2" d="M172.9,330.6H171l-4.2-4c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.2-0.2-0.3-0.3v4.6h-1.6v-6.3h2.2l3.9,3.7   c0,0,0.3,0.3,0.7,0.7v-4.4h1.6L172.9,330.6L172.9,330.6z"/>
      <path fill="#F0F0F2" d="M178.3,329.1l1.9-0.2c0.2,0.6,1.1,0.9,2.7,0.9c0.7,0,1.2-0.1,1.6-0.2c0.4-0.2,0.6-0.4,0.6-0.6   s-0.1-0.3-0.3-0.5c-0.2-0.1-0.5-0.3-1.1-0.3l-2.1-0.3c-0.7-0.1-1.3-0.2-1.6-0.4c-0.3-0.1-0.6-0.3-0.8-0.6   c-0.2-0.3-0.3-0.5-0.3-0.8c0-0.6,0.4-1,1.1-1.4c0.7-0.3,1.7-0.5,2.8-0.5c0.9,0,1.8,0.1,2.5,0.4c0.7,0.2,1.2,0.6,1.4,1l-1.9,0.3   c-0.3-0.5-1-0.7-2-0.7c-0.6,0-1.1,0.1-1.4,0.2c-0.3,0.1-0.5,0.3-0.5,0.6c0,0.4,0.5,0.6,1.5,0.8l1.9,0.3c1.1,0.2,1.9,0.4,2.3,0.7   c0.4,0.3,0.6,0.7,0.6,1.1c0,0.6-0.4,1.1-1.2,1.5s-1.9,0.5-3.2,0.5c-1.1,0-2-0.1-2.9-0.4C179.1,330,178.6,329.6,178.3,329.1z"/>
      <path fill="#F0F0F2" d="M193.1,330.6H191v-2.7l-3.8-3.7h2.4l2.6,2.6l2.5-2.6h1.9l-3.6,3.7v2.7H193.1z"/>
      <path fill="#F0F0F2" d="M205.9,330.6H204l-4.2-4c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.2-0.2-0.3-0.3v4.6h-1.6v-6.3h2.2l3.9,3.7   c0,0,0.3,0.3,0.7,0.7v-4.4h1.6L205.9,330.6L205.9,330.6z"/>
      <path fill="#F0F0F2" d="M212.2,330.6h-2.1v-5.4h-2.9v-1h8v1h-2.9v5.4H212.2z"/>
      <path fill="#F0F0F2" d="M224.5,330.6h-2v-2.8h-4.2v2.8h-2v-6.3h2v2.6h4.2v-2.6h2V330.6z"/>
      <path fill="#F0F0F2" d="M234.1,330.6h-7.2v-6.3h7.1v0.9h-5.1v1.7h4.1v0.9h-4.1v1.8h5.2V330.6z"/>
      <path fill="#F0F0F2" d="M234.6,329.1l1.9-0.2c0.2,0.6,1.1,0.9,2.7,0.9c0.7,0,1.2-0.1,1.6-0.2c0.4-0.2,0.6-0.4,0.6-0.6   s-0.1-0.3-0.3-0.5c-0.2-0.1-0.5-0.3-1.1-0.3l-2.1-0.3c-0.7-0.1-1.3-0.2-1.6-0.4c-0.3-0.1-0.6-0.3-0.8-0.6   c-0.2-0.3-0.3-0.5-0.3-0.8c0-0.6,0.4-1,1.1-1.4c0.7-0.3,1.7-0.5,2.8-0.5c0.9,0,1.8,0.1,2.5,0.4c0.7,0.2,1.2,0.6,1.4,1l-1.9,0.3   c-0.3-0.5-1-0.7-2-0.7c-0.6,0-1.1,0.1-1.4,0.2s-0.5,0.3-0.5,0.6c0,0.4,0.5,0.6,1.5,0.8l1.9,0.3c1.1,0.2,1.9,0.4,2.3,0.7   c0.4,0.3,0.6,0.7,0.6,1.1c0,0.6-0.4,1.1-1.2,1.5s-1.9,0.5-3.2,0.5c-1.1,0-2-0.1-2.9-0.4C235.5,330,234.9,329.6,234.6,329.1z"/>
      <path fill="#F0F0F2" d="M247.2,330.6h-2v-6.3h2V330.6z"/>
      <path fill="#F0F0F2" d="M256.9,329.6v1h-8.1v-0.9l5.6-4.5h-5.2v-0.9h7.6v0.9l-5.6,4.4H256.9z"/>
      <path fill="#F0F0F2" d="M265.6,330.6h-7.2v-6.3h7.1v0.9h-5.1v1.7h4.1v0.9h-4.1v1.8h5.2V330.6z"/>
      <path fill="#F0F0F2" d="M275.9,330.6h-2.1l-1.7-2.6h-2.8v2.6h-2v-6.3h4.8c1.3,0,2.3,0.2,2.9,0.5s0.9,0.8,0.9,1.3   c0,0.8-0.7,1.4-2,1.7L275.9,330.6z M269.3,327.1h2.5c0.7,0,1.2-0.1,1.6-0.3c0.3-0.2,0.5-0.4,0.5-0.7c0-0.3-0.2-0.5-0.5-0.7   s-0.8-0.3-1.4-0.3h-2.6v2H269.3z"/>
      <path fill="#F0F0F2" d="M78.7,378.2l1.6-0.2c0.1,0.6,0.3,1,0.6,1.2c0.3,0.3,0.7,0.4,1.2,0.4s0.9-0.1,1.2-0.4s0.4-0.5,0.4-0.8  c0-0.2-0.1-0.4-0.2-0.5s-0.3-0.3-0.6-0.4c-0.2-0.1-0.6-0.2-1.3-0.4c-0.9-0.2-1.5-0.5-1.9-0.8c-0.5-0.5-0.8-1-0.8-1.7  c0-0.4,0.1-0.8,0.4-1.2s0.6-0.7,1-0.9s1-0.3,1.6-0.3c1,0,1.8,0.2,2.3,0.7s0.8,1.1,0.8,1.9l-1.7,0.1c-0.1-0.4-0.2-0.8-0.5-1  s-0.6-0.3-1.1-0.3s-0.9,0.1-1.1,0.3c-0.2,0.1-0.3,0.3-0.3,0.5s0.1,0.4,0.2,0.5c0.2,0.2,0.7,0.4,1.5,0.6s1.4,0.4,1.8,0.6  s0.7,0.5,0.9,0.9c0.2,0.4,0.3,0.8,0.3,1.4c0,0.5-0.1,1-0.4,1.4s-0.6,0.7-1.1,1s-1.1,0.3-1.8,0.3c-1,0-1.8-0.3-2.4-0.8  S78.8,379.2,78.7,378.2z"/>
      <path fill="#F0F0F2" d="M88.6,381v-7.1h-2.4v-1.5h6.5v1.5h-2.4v7.1H88.6z"/>
      <path fill="#F0F0F2" d="M100.4,381h-1.8l-0.7-2h-3.3l-0.7,2h-1.8l3.2-8.6h1.8L100.4,381z M97.3,377.6l-1.1-3.2l-1.1,3.2H97.3z"/>
      <path fill="#F0F0F2" d="M101.3,381v-8.6h1.6l3.4,5.7v-5.7h1.5v8.6h-1.7l-3.3-5.6v5.6H101.3z"/>
      <path fill="#F0F0F2" d="M109.5,372.4h3c0.7,0,1.2,0.1,1.6,0.2c0.5,0.1,0.9,0.4,1.2,0.8s0.6,0.8,0.8,1.4s0.3,1.2,0.3,2  c0,0.7-0.1,1.3-0.3,1.8c-0.2,0.6-0.5,1.1-0.9,1.5c-0.3,0.3-0.7,0.5-1.2,0.7c-0.4,0.1-0.9,0.2-1.5,0.2h-3.1L109.5,372.4L109.5,372.4  z M111.2,373.8v5.7h1.2c0.5,0,0.8,0,1-0.1c0.3-0.1,0.5-0.2,0.7-0.4s0.3-0.4,0.4-0.8s0.2-0.9,0.2-1.6s-0.1-1.2-0.2-1.5  s-0.3-0.6-0.5-0.8s-0.5-0.3-0.8-0.4c-0.2-0.1-0.7-0.1-1.4-0.1L111.2,373.8L111.2,373.8z"/>
      <path fill="#F0F0F2" d="M117.9,372.4h3.3c0.7,0,1.1,0,1.5,0.1c0.3,0.1,0.6,0.2,0.9,0.4c0.3,0.2,0.5,0.4,0.6,0.7s0.3,0.6,0.3,1  s-0.1,0.8-0.3,1.1c-0.2,0.3-0.5,0.6-0.8,0.8c0.5,0.2,0.9,0.4,1.2,0.8s0.4,0.8,0.4,1.3c0,0.4-0.1,0.8-0.3,1.1  c-0.2,0.4-0.4,0.7-0.7,0.9s-0.7,0.4-1.1,0.4c-0.3,0-0.9,0.1-2,0.1h-2.8v-8.7L117.9,372.4L117.9,372.4z M119.5,373.8v2h1.1  c0.6,0,1,0,1.2,0c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.2-0.4,0.2-0.7c0-0.3-0.1-0.5-0.2-0.6c-0.1-0.2-0.3-0.3-0.6-0.3  c-0.2,0-0.6,0-1.4,0h-1C119.5,373.9,119.5,373.8,119.5,373.8z M119.5,377.2v2.3h1.5c0.6,0,1,0,1.1-0.1c0.2,0,0.4-0.2,0.6-0.3  s0.2-0.4,0.2-0.7c0-0.3-0.1-0.5-0.2-0.7s-0.3-0.3-0.5-0.4s-0.7-0.1-1.5-0.1L119.5,377.2L119.5,377.2z"/>
      <path fill="#F0F0F2" d="M128.3,381v-3.6l-3-5h1.9l1.9,3.4l1.9-3.4h1.9l-3,5v3.6H128.3z"/>
      <path fill="#F0F0F2" d="M81.2,399l-2.9-8.6h1.8l2.1,6.4l2-6.4H86l-3,8.6H81.2z"/>
      <path fill="#F0F0F2" d="M92,395.8l1.6,0.5c-0.2,0.9-0.7,1.6-1.2,2.1c-0.6,0.5-1.3,0.7-2.2,0.7c-1.1,0-2-0.4-2.7-1.2  s-1.1-1.8-1.1-3.2c0-1.4,0.4-2.5,1.1-3.3s1.6-1.2,2.8-1.2c1,0,1.8,0.3,2.5,0.9c0.4,0.4,0.7,0.9,0.8,1.6l-1.6,0.4  c-0.1-0.4-0.3-0.8-0.6-1.1s-0.7-0.4-1.1-0.4c-0.6,0-1.1,0.2-1.5,0.7s-0.6,1.2-0.6,2.2c0,1.1,0.2,1.9,0.6,2.3s0.9,0.7,1.5,0.7  c0.4,0,0.8-0.1,1.1-0.4C91.7,396.9,91.9,396.4,92,395.8z"/>
      <path fill="#F0F0F2" d="M94.7,394.7c0-0.9,0.1-1.6,0.4-2.2c0.2-0.4,0.4-0.8,0.8-1.2s0.7-0.6,1.1-0.8c0.5-0.2,1.1-0.3,1.8-0.3  c1.2,0,2.2,0.4,2.9,1.2c0.7,0.8,1.1,1.9,1.1,3.3s-0.4,2.5-1.1,3.3s-1.7,1.2-2.9,1.2c-1.2,0-2.2-0.4-2.9-1.2S94.7,396.1,94.7,394.7z   M96.5,394.7c0,1,0.2,1.7,0.6,2.2s1,0.8,1.6,0.8c0.7,0,1.2-0.2,1.6-0.7s0.6-1.2,0.6-2.2s-0.2-1.7-0.6-2.2s-1-0.7-1.6-0.7  c-0.7,0-1.2,0.2-1.7,0.7S96.5,393.7,96.5,394.7z"/>
      <path fill="#F0F0F2" d="M107.7,399h-1.6v-6.2c-0.6,0.6-1.3,1-2,1.2v-1.5c0.4-0.1,0.9-0.4,1.3-0.8s0.8-0.9,1-1.4h1.3  C107.7,390.3,107.7,399,107.7,399z"/>
      <path fill="#F0F0F2" d="M81.2,417l-2.9-8.6h1.8l2.1,6.4l2-6.4H86l-3,8.6H81.2z"/>
      <path fill="#F0F0F2" d="M92,413.8l1.6,0.5c-0.2,0.9-0.7,1.6-1.2,2.1c-0.6,0.5-1.3,0.7-2.2,0.7c-1.1,0-2-0.4-2.7-1.2  s-1.1-1.8-1.1-3.2c0-1.4,0.4-2.5,1.1-3.3s1.6-1.2,2.8-1.2c1,0,1.8,0.3,2.5,0.9c0.4,0.4,0.7,0.9,0.8,1.6l-1.6,0.4  c-0.1-0.4-0.3-0.8-0.6-1.1s-0.7-0.4-1.1-0.4c-0.6,0-1.1,0.2-1.5,0.7s-0.6,1.2-0.6,2.2c0,1.1,0.2,1.9,0.6,2.3s0.9,0.7,1.5,0.7  c0.4,0,0.8-0.1,1.1-0.4C91.7,414.9,91.9,414.4,92,413.8z"/>
      <path fill="#F0F0F2" d="M94.7,412.7c0-0.9,0.1-1.6,0.4-2.2c0.2-0.4,0.4-0.8,0.8-1.2s0.7-0.6,1.1-0.8c0.5-0.2,1.1-0.3,1.8-0.3  c1.2,0,2.2,0.4,2.9,1.2c0.7,0.8,1.1,1.9,1.1,3.3s-0.4,2.5-1.1,3.3s-1.7,1.2-2.9,1.2c-1.2,0-2.2-0.4-2.9-1.2S94.7,414.1,94.7,412.7z   M96.5,412.7c0,1,0.2,1.7,0.6,2.2s1,0.8,1.6,0.8c0.7,0,1.2-0.2,1.6-0.7s0.6-1.2,0.6-2.2s-0.2-1.7-0.6-2.2s-1-0.7-1.6-0.7  c-0.7,0-1.2,0.2-1.7,0.7S96.5,411.7,96.5,412.7z"/>
      <path fill="#F0F0F2" d="M107.7,417h-1.6v-6.2c-0.6,0.6-1.3,1-2,1.2v-1.5c0.4-0.1,0.9-0.4,1.3-0.8s0.8-0.9,1-1.4h1.3  C107.7,408.3,107.7,417,107.7,417z"/>
      <path fill="#F0F0F2" d="M112.2,415.7v-2.2H110V412h2.2v-2.2h1.4v2.2h2.2v1.5h-2.2v2.2H112.2z"/>
      <path fill="#F0F0F2" d="M122.1,415.4v1.5h-5.5c0.1-0.6,0.2-1.1,0.5-1.6s0.9-1.2,1.8-2.1c0.7-0.7,1.1-1.2,1.3-1.4  c0.2-0.3,0.3-0.7,0.3-1c0-0.4-0.1-0.6-0.3-0.8s-0.5-0.3-0.8-0.3s-0.6,0.1-0.8,0.3c-0.2,0.2-0.3,0.6-0.3,1l-1.6-0.2  c0.1-0.9,0.4-1.6,0.9-2s1.1-0.6,1.9-0.6s1.5,0.2,1.9,0.7c0.5,0.5,0.7,1,0.7,1.7c0,0.4-0.1,0.8-0.2,1.1s-0.3,0.7-0.6,1.1  c-0.2,0.3-0.5,0.6-1,1.1s-0.8,0.8-0.9,0.9s-0.2,0.3-0.3,0.5L122.1,415.4L122.1,415.4z"/>
      <line fill="none" stroke="#E6E7E8" stroke-miterlimit="10" x1="222.5" y1="349.5" x2="222.5" y2="426.7"/>
      <line fill="none" stroke="#E6E7E8" stroke-miterlimit="10" x1="141" y1="349.5" x2="141" y2="437.5"/>
      <path fill="#414042" d="M285.4,425.1h-1.6V419c-0.6,0.6-1.2,1-2,1.2v-1.5c0.4-0.1,0.8-0.4,1.3-0.8s0.8-0.8,1-1.4h1.3L285.4,425.1  L285.4,425.1z"/>
      <path fill="#414042" d="M290.4,416.6c0.8,0,1.4,0.3,1.8,0.9c0.5,0.7,0.8,1.8,0.8,3.4s-0.3,2.8-0.8,3.5c-0.4,0.6-1.1,0.9-1.8,0.9  c-0.8,0-1.4-0.3-1.9-0.9s-0.7-1.8-0.7-3.4s0.3-2.7,0.8-3.4C289,416.9,289.6,416.6,290.4,416.6z M290.4,417.9  c-0.2,0-0.4,0.1-0.5,0.2s-0.3,0.3-0.3,0.7c-0.1,0.4-0.2,1.1-0.2,2.1s0,1.7,0.1,2c0.1,0.4,0.2,0.6,0.4,0.7s0.3,0.2,0.5,0.2  s0.4-0.1,0.5-0.2s0.3-0.3,0.3-0.7c0.1-0.4,0.2-1.1,0.2-2.1s0-1.7-0.1-2c-0.1-0.4-0.2-0.6-0.4-0.7S290.5,417.9,290.4,417.9z"/>
      <path fill="#414042" d="M244.1,416.6c0.8,0,1.4,0.3,1.8,0.9c0.5,0.7,0.8,1.8,0.8,3.4s-0.3,2.8-0.8,3.5c-0.4,0.6-1.1,0.9-1.8,0.9  c-0.8,0-1.4-0.3-1.9-0.9s-0.7-1.8-0.7-3.4s0.3-2.7,0.8-3.4C242.7,416.9,243.3,416.6,244.1,416.6z M244.1,417.9  c-0.2,0-0.4,0.1-0.5,0.2s-0.3,0.3-0.3,0.7c-0.1,0.4-0.2,1.1-0.2,2.1s0,1.7,0.1,2c0.1,0.4,0.2,0.6,0.4,0.7s0.3,0.2,0.5,0.2  s0.4-0.1,0.5-0.2s0.3-0.3,0.3-0.7c0.1-0.4,0.2-1.1,0.2-2.1s0-1.7-0.1-2c-0.1-0.4-0.2-0.6-0.4-0.7S244.3,417.9,244.1,417.9z"/>
      <path fill="#414042" d="M261.6,359.3l1.5-0.2c0,0.4,0.2,0.7,0.4,0.9c0.2,0.2,0.5,0.3,0.8,0.3s0.6-0.1,0.8-0.4  c0.2-0.3,0.3-0.7,0.3-1.2s-0.1-0.9-0.3-1.2c-0.2-0.3-0.5-0.4-0.9-0.4s-0.8,0.2-1.2,0.6l-1.3-0.2l0.8-4.4h4.1v1.5h-2.9l-0.2,1.4  c0.3-0.2,0.7-0.3,1.1-0.3c0.7,0,1.3,0.3,1.8,0.8s0.7,1.2,0.7,2c0,0.7-0.2,1.3-0.6,1.9c-0.5,0.7-1.3,1.1-2.2,1.1  c-0.7,0-1.4-0.2-1.8-0.6S261.7,360,261.6,359.3z"/>
      <path fill="#414042" stroke="#414042" stroke-miterlimit="10" d="M249.4,368.5l4.1,6.9 M247.2,376.4l2.1,2.1 M245.9,383l-6.8-4   L245.9,383 M243.6,388l-2.7-0.7L243.6,388 M242.9,393.7H235H242.9 M243.6,398.9l-2.7,0.7L243.6,398.9 M245.9,404.3l-6.8,4   L245.9,404.3 M249.2,408.6l-2.1,2.1L249.2,408.6 M253.6,412l-4,6.9L253.6,412 M274.7,411.7l4.2,7.2L274.7,411.7 M278.8,408.5   l2.3,2.3L278.8,408.5 M282.2,404.1l7.2,4.2L282.2,404.1 M284.3,399.1l3.2,0.9L284.3,399.1 M285,393.7h8.4H285 M284.4,388.5l3.2-0.9   L284.4,388.5 M282.2,383.2l7.2-4.2L282.2,383.2 M278.9,378.9l2.3-2.3L278.9,378.9 M274.6,375.6l4.1-7.2L274.6,375.6 M269.8,373.5   l0.9-3.1L269.8,373.5 M264.3,364.4v8.1 M258.1,370.2l0.7,3"/>
      <path fill="#F0F0F2" d="M201.4,425.1h-1.6v-6.2c-0.6,0.6-1.3,1-2,1.2v-1.5c0.4-0.1,0.9-0.4,1.3-0.8s0.8-0.9,1-1.4h1.3V425.1z"/>
      <path fill="#F0F0F2" d="M206.5,416.5c0.8,0,1.4,0.3,1.9,0.9c0.5,0.7,0.8,1.9,0.8,3.5s-0.3,2.8-0.8,3.5c-0.4,0.6-1.1,0.9-1.9,0.9   c-0.8,0-1.4-0.3-1.9-1s-0.7-1.8-0.7-3.4s0.3-2.8,0.8-3.5C205,416.7,205.7,416.5,206.5,416.5z M206.5,417.8c-0.2,0-0.4,0.1-0.5,0.2   s-0.3,0.4-0.3,0.7c-0.1,0.4-0.2,1.1-0.2,2.2s0,1.7,0.1,2.1s0.2,0.6,0.4,0.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2   s0.3-0.4,0.3-0.7c0.1-0.4,0.2-1.1,0.2-2.1s0-1.7-0.1-2.1s-0.2-0.6-0.4-0.8C206.8,417.9,206.7,417.8,206.5,417.8z"/>
      <path fill="#F0F0F2" d="M160.1,416.5c0.8,0,1.4,0.3,1.9,0.9c0.5,0.7,0.8,1.9,0.8,3.5s-0.3,2.8-0.8,3.5c-0.4,0.6-1.1,0.9-1.9,0.9   c-0.8,0-1.4-0.3-1.9-1s-0.7-1.8-0.7-3.4s0.3-2.8,0.8-3.5C158.7,416.7,159.3,416.5,160.1,416.5z M160.1,417.8   c-0.2,0-0.4,0.1-0.5,0.2s-0.3,0.4-0.3,0.7c-0.1,0.4-0.2,1.1-0.2,2.2s0,1.7,0.1,2.1s0.2,0.6,0.4,0.8c0.1,0.1,0.3,0.2,0.5,0.2   s0.4-0.1,0.5-0.2s0.3-0.4,0.3-0.7c0.1-0.4,0.2-1.1,0.2-2.1s0-1.7-0.1-2.1s-0.2-0.6-0.4-0.8C160.5,417.9,160.3,417.8,160.1,417.8z"/>
      <path fill="#F0F0F2" d="M368.8,425.1h-1.6v-6.2c-0.6,0.6-1.3,1-2,1.2v-1.5c0.4-0.1,0.9-0.4,1.3-0.8c0.5-0.4,0.8-0.9,1-1.4h1.3   L368.8,425.1L368.8,425.1z"/>
      <path fill="#F0F0F2" d="M373.8,416.5c0.8,0,1.4,0.3,1.9,0.9c0.5,0.7,0.8,1.9,0.8,3.5s-0.3,2.8-0.8,3.5c-0.4,0.6-1.1,0.9-1.9,0.9   s-1.4-0.3-1.9-1s-0.7-1.8-0.7-3.4s0.3-2.8,0.8-3.5C372.4,416.7,373,416.5,373.8,416.5z M373.8,417.8c-0.2,0-0.4,0.1-0.5,0.2   c-0.2,0.1-0.3,0.4-0.3,0.7c-0.1,0.4-0.2,1.1-0.2,2.2s0,1.7,0.1,2.1s0.2,0.6,0.4,0.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2   s0.3-0.4,0.3-0.7c0.1-0.4,0.2-1.1,0.2-2.1s0-1.7-0.1-2.1s-0.2-0.6-0.4-0.8S374,417.8,373.8,417.8z"/>
      <path fill="#F0F0F2" d="M327.4,416.5c0.8,0,1.4,0.3,1.9,0.9c0.5,0.7,0.8,1.9,0.8,3.5s-0.3,2.8-0.8,3.5c-0.4,0.6-1.1,0.9-1.9,0.9   s-1.4-0.3-1.9-1s-0.7-1.8-0.7-3.4s0.3-2.8,0.8-3.5C326,416.7,326.6,416.5,327.4,416.5z M327.4,417.8c-0.2,0-0.4,0.1-0.5,0.2   c-0.2,0.1-0.3,0.4-0.3,0.7c-0.1,0.4-0.2,1.1-0.2,2.2s0,1.7,0.1,2.1s0.2,0.6,0.4,0.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2   s0.3-0.4,0.3-0.7c0.1-0.4,0.2-1.1,0.2-2.1s0-1.7-0.1-2.1s-0.2-0.6-0.4-0.8S327.6,417.8,327.4,417.8z"/>
      <path fill="#F0F0F2" d="M452.6,425.1H451v-6.2c-0.6,0.6-1.3,1-2,1.2v-1.5c0.4-0.1,0.9-0.4,1.3-0.8c0.5-0.4,0.8-0.9,1-1.4h1.3   L452.6,425.1L452.6,425.1z"/>
      <path fill="#F0F0F2" d="M457.6,416.5c0.8,0,1.4,0.3,1.9,0.9c0.5,0.7,0.8,1.9,0.8,3.5s-0.3,2.8-0.8,3.5c-0.4,0.6-1.1,0.9-1.9,0.9   s-1.4-0.3-1.9-1s-0.7-1.8-0.7-3.4s0.3-2.8,0.8-3.5C456.2,416.7,456.8,416.5,457.6,416.5z M457.6,417.8c-0.2,0-0.4,0.1-0.5,0.2   s-0.3,0.4-0.3,0.7c-0.1,0.4-0.2,1.1-0.2,2.2s0,1.7,0.1,2.1s0.2,0.6,0.4,0.8s0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2   c0.2-0.1,0.3-0.4,0.3-0.7c0.1-0.4,0.2-1.1,0.2-2.1s0-1.7-0.1-2.1s-0.2-0.6-0.4-0.8C458,417.9,457.8,417.8,457.6,417.8z"/>
      <path fill="#F0F0F2" d="M411.3,416.5c0.8,0,1.4,0.3,1.9,0.9c0.5,0.7,0.8,1.9,0.8,3.5s-0.3,2.8-0.8,3.5c-0.4,0.6-1.1,0.9-1.9,0.9   s-1.4-0.3-1.9-1s-0.7-1.8-0.7-3.4s0.3-2.8,0.8-3.5C409.9,416.7,410.5,416.5,411.3,416.5z M411.3,417.8c-0.2,0-0.4,0.1-0.5,0.2   s-0.3,0.4-0.3,0.7c-0.1,0.4-0.2,1.1-0.2,2.2s0,1.7,0.1,2.1s0.2,0.6,0.4,0.8s0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2   c0.2-0.1,0.3-0.4,0.3-0.7c0.1-0.4,0.2-1.1,0.2-2.1s0-1.7-0.1-2.1s-0.2-0.6-0.4-0.8C411.6,417.9,411.5,417.8,411.3,417.8z"/>
      <path fill="#F0F0F2" d="M535.5,425.1h-1.6v-6.2c-0.6,0.6-1.3,1-2,1.2v-1.5c0.4-0.1,0.9-0.4,1.3-0.8c0.5-0.4,0.8-0.9,1-1.4h1.3   V425.1z"/>
      <path fill="#F0F0F2" d="M540.5,416.5c0.8,0,1.4,0.3,1.9,0.9c0.5,0.7,0.8,1.9,0.8,3.5s-0.3,2.8-0.8,3.5c-0.4,0.6-1.1,0.9-1.9,0.9   c-0.8,0-1.4-0.3-1.9-1s-0.7-1.8-0.7-3.4s0.3-2.8,0.8-3.5C539.1,416.7,539.7,416.5,540.5,416.5z M540.5,417.8   c-0.2,0-0.4,0.1-0.5,0.2c-0.2,0.1-0.3,0.4-0.3,0.7c-0.1,0.4-0.2,1.1-0.2,2.2s0,1.7,0.1,2.1s0.2,0.6,0.4,0.8   c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2s0.3-0.4,0.3-0.7c0.1-0.4,0.2-1.1,0.2-2.1s0-1.7-0.1-2.1s-0.2-0.6-0.4-0.8   S540.7,417.8,540.5,417.8z"/>
      <path fill="#F0F0F2" d="M494.1,416.5c0.8,0,1.4,0.3,1.9,0.9c0.5,0.7,0.8,1.9,0.8,3.5s-0.3,2.8-0.8,3.5c-0.4,0.6-1.1,0.9-1.9,0.9   s-1.4-0.3-1.9-1s-0.7-1.8-0.7-3.4s0.3-2.8,0.8-3.5C492.7,416.7,493.3,416.5,494.1,416.5z M494.1,417.8c-0.2,0-0.4,0.1-0.5,0.2   c-0.2,0.1-0.3,0.4-0.3,0.7c-0.1,0.4-0.2,1.1-0.2,2.2s0,1.7,0.1,2.1s0.2,0.6,0.4,0.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2   s0.3-0.4,0.3-0.7c0.1-0.4,0.2-1.1,0.2-2.1s0-1.7-0.1-2.1s-0.2-0.6-0.4-0.8S494.3,417.8,494.1,417.8z"/>
      <path fill="#F0F0F2" d="M328.5,361.2l-4.5-12.1h2.7l3.2,9l3.1-9h2.7l-4.5,12.1H328.5z"/>
      <path fill="#F0F0F2" d="M344.9,356.7l2.4,0.8c-0.4,1.3-1,2.3-1.9,2.9s-2,1-3.3,1c-1.7,0-3-0.5-4.1-1.6s-1.6-2.6-1.6-4.5  c0-2,0.5-3.6,1.6-4.7s2.5-1.7,4.2-1.7c1.5,0,2.8,0.4,3.7,1.3c0.6,0.5,1,1.3,1.3,2.2l-2.5,0.6c-0.1-0.6-0.5-1.1-0.9-1.5  c-0.5-0.4-1-0.5-1.7-0.5c-0.9,0-1.7,0.3-2.2,1c-0.6,0.6-0.9,1.7-0.9,3.1c0,1.5,0.3,2.6,0.8,3.3s1.3,1,2.2,1c0.7,0,1.2-0.2,1.7-0.6  C344.3,358.3,344.7,357.6,344.9,356.7z"/>
      <path fill="#F0F0F2" d="M349,355.2c0-1.2,0.2-2.3,0.6-3.1c0.3-0.6,0.7-1.2,1.2-1.7s1-0.9,1.6-1.1c0.8-0.3,1.7-0.5,2.7-0.5  c1.8,0,3.3,0.6,4.4,1.7s1.7,2.6,1.7,4.6s-0.5,3.5-1.6,4.6s-2.6,1.7-4.4,1.7c-1.9,0-3.3-0.5-4.4-1.6  C349.5,358.6,349,357.1,349,355.2z M351.6,355.1c0,1.4,0.3,2.4,1,3.1s1.5,1.1,2.5,1.1s1.8-0.4,2.5-1.1c0.6-0.7,1-1.8,1-3.2  c0-1.4-0.3-2.4-0.9-3.1s-1.5-1-2.5-1s-1.9,0.3-2.5,1C351.9,352.7,351.6,353.7,351.6,355.1z"/>
      <path fill="#F0F0F2" d="M370.6,359v2.2h-8.4c0.1-0.8,0.4-1.6,0.8-2.3c0.5-0.7,1.3-1.7,2.7-2.9c1.1-1,1.7-1.6,2-2  c0.3-0.5,0.5-1,0.5-1.4c0-0.5-0.1-0.9-0.4-1.2c-0.3-0.3-0.7-0.4-1.2-0.4s-0.9,0.1-1.2,0.4c-0.3,0.3-0.5,0.8-0.5,1.5l-2.4-0.2  c0.1-1.3,0.6-2.2,1.3-2.8s1.7-0.8,2.8-0.8c1.2,0,2.2,0.3,2.9,1s1.1,1.4,1.1,2.4c0,0.5-0.1,1.1-0.3,1.6s-0.5,1-1,1.6  c-0.3,0.4-0.8,0.9-1.6,1.5c-0.8,0.7-1.2,1.1-1.4,1.3c-0.2,0.2-0.4,0.4-0.5,0.6h4.8L370.6,359L370.6,359z"/>
      <path fill="#F0F0F2" d="M462.9,361.2l-4.5-12.1h2.7l3.2,9l3.1-9h2.7l-4.5,12.1H462.9z"/>
      <path fill="#F0F0F2" d="M479.3,356.7l2.4,0.8c-0.4,1.3-1,2.3-1.9,2.9s-2,1-3.3,1c-1.7,0-3-0.5-4.1-1.6s-1.6-2.6-1.6-4.5  c0-2,0.5-3.6,1.6-4.7s2.5-1.7,4.2-1.7c1.5,0,2.8,0.4,3.7,1.3c0.6,0.5,1,1.3,1.3,2.2l-2.5,0.6c-0.1-0.6-0.5-1.1-0.9-1.5  s-1-0.5-1.7-0.5c-0.9,0-1.7,0.3-2.2,1c-0.6,0.6-0.9,1.7-0.9,3.1c0,1.5,0.3,2.6,0.9,3.3s1.3,1,2.2,1c0.7,0,1.2-0.2,1.7-0.6  S479.1,357.6,479.3,356.7z"/>
      <path fill="#F0F0F2" d="M483.9,361.2v-12.1h8.5v2.1h-6v2.9h5.2v2.1h-5.2v5.2h-2.5V361.2z"/>
      <line fill="none" stroke="#E6E7E8" stroke-miterlimit="10" x1="392.2" y1="349.5" x2="392.2" y2="437.5"/>
      <path fill="#F0F0F2" d="M163.6,438.5v-8.6h2.9c1.1,0,1.8,0,2.1,0.1c0.5,0.1,0.9,0.4,1.3,0.8c0.3,0.4,0.5,1,0.5,1.7  c0,0.5-0.1,1-0.3,1.3c-0.2,0.4-0.4,0.6-0.8,0.8c-0.3,0.2-0.6,0.3-0.9,0.4c-0.4,0.1-1,0.1-1.9,0.1h-1.2v3.2h-1.7L163.6,438.5  L163.6,438.5z M165.4,431.4v2.4h1c0.7,0,1.2,0,1.4-0.1s0.4-0.2,0.6-0.4s0.2-0.4,0.2-0.7c0-0.3-0.1-0.6-0.3-0.8s-0.4-0.3-0.7-0.4  c-0.2,0-0.6-0.1-1.3-0.1h-0.9V431.4z"/>
      <path fill="#F0F0F2" d="M171.8,438.5v-8.6h1.8v8.6H171.8z"/>
      <path fill="#F0F0F2" d="M177.3,438.5v-7.1h-2.6v-1.5h7v1.5H179v7.1H177.3z"/>
      <path fill="#F0F0F2" d="M188.5,435.3l1.7,0.5c-0.3,0.9-0.7,1.6-1.3,2.1s-1.4,0.7-2.3,0.7c-1.2,0-2.1-0.4-2.9-1.2s-1.1-1.8-1.1-3.2  c0-1.4,0.4-2.5,1.1-3.3c0.8-0.8,1.8-1.2,3-1.2c1.1,0,2,0.3,2.6,0.9c0.4,0.4,0.7,0.9,0.9,1.6l-1.8,0.4c-0.1-0.4-0.3-0.8-0.7-1.1  c-0.3-0.3-0.7-0.4-1.2-0.4c-0.7,0-1.2,0.2-1.6,0.7s-0.6,1.2-0.6,2.2c0,1.1,0.2,1.9,0.6,2.3c0.4,0.5,0.9,0.7,1.6,0.7  c0.5,0,0.9-0.1,1.2-0.4C188.1,436.4,188.3,436,188.5,435.3z"/>
      <path fill="#F0F0F2" d="M191.7,438.5v-8.6h1.8v3.4h3.5v-3.4h1.8v8.6H197v-3.8h-3.5v3.8H191.7z"/>
      <path fill="#F0F0F2" d="M231.3,438.5l3-4.5l-2.7-4.1h2.1l1.8,2.8l1.7-2.8h2.1l-2.8,4.2l3,4.4h-2.2l-2-3l-2,3H231.3z"/>
      <path fill="#F0F0F2" d="M240.2,436.2v-1.6h3.3v1.6H240.2z"/>
      <path fill="#F0F0F2" d="M244.5,438.5v-8.6h2.7l1.6,5.9l1.6-5.9h2.7v8.6h-1.7v-6.8l-1.8,6.8H248l-1.7-6.8v6.8H244.5z"/>
      <path fill="#F0F0F2" d="M254.5,434.3c0-0.9,0.1-1.6,0.4-2.2c0.2-0.4,0.5-0.8,0.8-1.2c0.3-0.3,0.7-0.6,1.1-0.8  c0.6-0.2,1.2-0.3,1.9-0.3c1.3,0,2.3,0.4,3.1,1.2c0.8,0.8,1.2,1.9,1.2,3.3s-0.4,2.5-1.2,3.3s-1.8,1.2-3.1,1.2  c-1.3,0-2.4-0.4-3.1-1.2S254.5,435.6,254.5,434.3z M256.3,434.2c0,1,0.2,1.7,0.7,2.2s1,0.8,1.8,0.8c0.7,0,1.3-0.3,1.8-0.7  c0.5-0.5,0.7-1.2,0.7-2.2s-0.2-1.7-0.7-2.2c-0.4-0.5-1-0.7-1.8-0.7s-1.3,0.2-1.8,0.7C256.6,432.5,256.3,433.2,256.3,434.2z"/>
      <path fill="#F0F0F2" d="M264.5,429.9h3.3c0.7,0,1.3,0.1,1.7,0.2c0.5,0.1,1,0.4,1.3,0.8c0.4,0.4,0.7,0.8,0.8,1.4  c0.2,0.5,0.3,1.2,0.3,2c0,0.7-0.1,1.3-0.3,1.8c-0.2,0.6-0.5,1.1-0.9,1.5c-0.3,0.3-0.7,0.5-1.3,0.7c-0.4,0.1-0.9,0.2-1.6,0.2h-3.4  v-8.6H264.5z M266.2,431.4v5.7h1.3c0.5,0,0.9,0,1.1-0.1c0.3-0.1,0.5-0.2,0.7-0.4s0.3-0.4,0.5-0.8c0.1-0.4,0.2-0.9,0.2-1.6  s-0.1-1.2-0.2-1.5c-0.1-0.4-0.3-0.6-0.5-0.8s-0.5-0.3-0.8-0.4c-0.2-0.1-0.7-0.1-1.5-0.1L266.2,431.4L266.2,431.4z"/>
      <path fill="#F0F0F2" d="M276.8,438.5v-8.6h1.8v8.6H276.8z"/>
      <path fill="#F0F0F2" d="M280.3,438.5v-8.6h1.7l3.6,5.7v-5.7h1.7v8.6h-1.8l-3.6-5.6v5.6H280.3z"/>
      <path fill="#F0F0F2" d="M291.2,438.5v-7.1h-2.6v-1.5h7v1.5H293v7.1H291.2z"/>
      <path fill="#F0F0F2" d="M295.3,438.5v-1.6h1.7v1.6H295.3z"/>
      <path fill="#F0F0F2" d="M330.9,438.5v-8.6h2.9c1.1,0,1.8,0,2.1,0.1c0.5,0.1,0.9,0.4,1.3,0.8c0.3,0.4,0.5,1,0.5,1.7  c0,0.5-0.1,1-0.3,1.3c-0.2,0.4-0.4,0.6-0.8,0.8c-0.3,0.2-0.6,0.3-0.9,0.4c-0.4,0.1-1,0.1-1.9,0.1h-1.2v3.2h-1.7V438.5z   M332.7,431.4v2.4h1c0.7,0,1.2,0,1.4-0.1c0.2-0.1,0.4-0.2,0.6-0.4s0.2-0.4,0.2-0.7c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.4-0.3-0.7-0.4  c-0.2,0-0.6-0.1-1.3-0.1h-0.9L332.7,431.4L332.7,431.4z"/>
      <path fill="#F0F0F2" d="M339.1,438.5v-8.6h1.8v8.6H339.1z"/>
      <path fill="#F0F0F2" d="M344.5,438.5v-7.1h-2.6v-1.5h7v1.5h-2.6v7.1H344.5z"/>
      <path fill="#F0F0F2" d="M355.8,435.3l1.7,0.5c-0.3,0.9-0.7,1.6-1.3,2.1c-0.6,0.5-1.4,0.7-2.3,0.7c-1.2,0-2.1-0.4-2.9-1.2  s-1.1-1.8-1.1-3.2c0-1.4,0.4-2.5,1.1-3.3c0.8-0.8,1.8-1.2,3-1.2c1.1,0,2,0.3,2.6,0.9c0.4,0.4,0.7,0.9,0.9,1.6l-1.8,0.4  c-0.1-0.4-0.3-0.8-0.7-1.1c-0.3-0.3-0.7-0.4-1.2-0.4c-0.7,0-1.2,0.2-1.6,0.7s-0.6,1.2-0.6,2.2c0,1.1,0.2,1.9,0.6,2.3  c0.4,0.5,0.9,0.7,1.6,0.7c0.5,0,0.9-0.1,1.2-0.4C355.4,436.4,355.6,436,355.8,435.3z"/>
      <path fill="#F0F0F2" d="M359,438.5v-8.6h1.8v3.4h3.5v-3.4h1.8v8.6h-1.8v-3.8h-3.5v3.8H359z"/>
      <path fill="#F0F0F2" d="M413.8,435.3l1.7,0.5c-0.3,0.9-0.7,1.6-1.3,2.1c-0.6,0.5-1.4,0.7-2.3,0.7c-1.2,0-2.1-0.4-2.9-1.2  s-1.1-1.8-1.1-3.2c0-1.4,0.4-2.5,1.1-3.3c0.8-0.8,1.8-1.2,3-1.2c1.1,0,2,0.3,2.6,0.9c0.4,0.4,0.7,0.9,0.9,1.6l-1.8,0.4  c-0.1-0.4-0.3-0.8-0.7-1.1c-0.3-0.3-0.7-0.4-1.2-0.4c-0.7,0-1.2,0.2-1.6,0.7s-0.6,1.2-0.6,2.2c0,1.1,0.2,1.9,0.6,2.3  c0.4,0.5,0.9,0.7,1.6,0.7c0.5,0,0.9-0.1,1.2-0.4C413.4,436.4,413.7,436,413.8,435.3z"/>
      <path fill="#F0F0F2" d="M417.1,429.9h1.8v4.7c0,0.7,0,1.2,0.1,1.4c0.1,0.4,0.3,0.6,0.5,0.8c0.3,0.2,0.7,0.3,1.2,0.3  s0.9-0.1,1.1-0.3c0.3-0.2,0.4-0.4,0.5-0.7c0.1-0.3,0.1-0.8,0.1-1.5v-4.8h1.8v4.5c0,1,0,1.8-0.1,2.2s-0.3,0.8-0.5,1.1  c-0.3,0.3-0.6,0.5-1,0.7s-1,0.3-1.7,0.3c-0.8,0-1.5-0.1-1.9-0.3c-0.4-0.2-0.8-0.4-1-0.7c-0.3-0.3-0.4-0.6-0.5-1  c-0.1-0.5-0.2-1.2-0.2-2.2v-4.5H417.1z"/>
      <path fill="#F0F0F2" d="M428,438.5v-7.1h-2.6v-1.5h7v1.5h-2.6v7.1H428z"/>
      <path fill="#F0F0F2" d="M433,434.3c0-0.9,0.1-1.6,0.4-2.2c0.2-0.4,0.5-0.8,0.8-1.2c0.3-0.3,0.7-0.6,1.1-0.8  c0.6-0.2,1.2-0.3,1.9-0.3c1.3,0,2.3,0.4,3.1,1.2c0.8,0.8,1.2,1.9,1.2,3.3s-0.4,2.5-1.2,3.3c-0.8,0.8-1.8,1.2-3.1,1.2  c-1.3,0-2.4-0.4-3.1-1.2C433.4,436.7,433,435.6,433,434.3z M434.8,434.2c0,1,0.2,1.7,0.7,2.2s1,0.8,1.8,0.8s1.3-0.3,1.8-0.7  c0.5-0.5,0.7-1.2,0.7-2.2s-0.2-1.7-0.7-2.2c-0.4-0.5-1-0.7-1.8-0.7c-0.7,0-1.3,0.2-1.8,0.7C435,432.5,434.8,433.2,434.8,434.2z"/>
      <path fill="#F0F0F2" d="M443,438.5v-8.6h6.1v1.5h-4.3v2h3.7v1.5h-3.7v3.7H443V438.5z"/>
      <path fill="#F0F0F2" d="M450.5,438.5v-8.6h6.1v1.5h-4.3v2h3.7v1.5h-3.7v3.7h-1.8L450.5,438.5L450.5,438.5z"/>
      <path fill="#F0F0F2" d="M498.9,438.5v-8.6h2.9c1.1,0,1.8,0,2.1,0.1c0.5,0.1,0.9,0.4,1.3,0.8c0.3,0.4,0.5,1,0.5,1.7  c0,0.5-0.1,1-0.3,1.3s-0.4,0.6-0.8,0.8c-0.3,0.2-0.6,0.3-0.9,0.4c-0.4,0.1-1,0.1-1.9,0.1h-1.2v3.2h-1.7V438.5z M500.7,431.4v2.4h1  c0.7,0,1.2,0,1.4-0.1s0.4-0.2,0.6-0.4s0.2-0.4,0.2-0.7c0-0.3-0.1-0.6-0.3-0.8c-0.2-0.2-0.4-0.3-0.7-0.4c-0.2,0-0.6-0.1-1.3-0.1  h-0.9L500.7,431.4L500.7,431.4z"/>
      <path fill="#F0F0F2" d="M507.1,438.5v-8.6h6.6v1.5h-4.8v1.9h4.4v1.4h-4.4v2.3h4.9v1.4h-6.7L507.1,438.5L507.1,438.5z"/>
      <path fill="#F0F0F2" d="M523.3,438.5h-1.9l-0.8-2h-3.5l-0.7,2h-1.9l3.4-8.6h1.9L523.3,438.5z M520,435.1l-1.2-3.2l-1.2,3.2H520z"/>
      <path fill="#F0F0F2" d="M524.3,438.5v-8.6h1.8v3.8l3.6-3.8h2.4l-3.3,3.4l3.5,5.3H530l-2.4-4l-1.4,1.4v2.6L524.3,438.5L524.3,438.5z  "/>
    </g>
  );

  let divClassName = dragging ? `monotron dragging` : `monotron`;

  return (
    <div className={divClassName}>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 215.5 609.9 359" enable-background="new 0 215.5 609.9 359" xmlSpace="preserve">

            {staticSvg}

            <Toggle name="toggleOsc2" />

            {Object.keys(knobs).map(function(name) {
                let knob = knobs[name];

                return (
                  <Knob
                    key={name}
                    name={name}
                    position={knob.position}
                    onMouseDown={() => onMouseDownKnob(name)}
                  />
                );
            })}

            <KeyboardContainer />

        </svg>
    </div>
  )
}