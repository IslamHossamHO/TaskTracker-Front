import { motion } from "framer-motion";
import "../Styles/Components/Card.css";

export default function Card({ imga, slabel, num, note, bgcolor }) {
  return (
    <motion.div 
      className="CardFrame"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
    >
      <div className="CardHorizontal">
        <motion.div
          className="CardIconFrame"
          style={{ backgroundColor: bgcolor }}
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.2 }
          }}
        >
          <img className="CardIcon" src={imga} alt="Icon" />
        </motion.div>
        <div className="CardLabels">
          <label className="CardLabelSmall">{slabel}</label>
          <label className="CardNumberSmall">{num}</label>
          {note && <label className="CardNoteSmall">{note}</label>}
        </div>
      </div>
    </motion.div>
  );
}
