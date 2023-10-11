import "../stylesheets/Sidebar.css";
import { motion } from "framer-motion";
import {
  DashboardRounded,
  TocRounded,
} from "@mui/icons-material";
import OnlinePredictionRoundedIcon from '@mui/icons-material/OnlinePredictionRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import Item from "./Item";
import { useState } from "react";

function SideBar() {
  const [open, setOpen] = useState(true);

  // for collpsing sidebar
  const handleToggle = () => {
    setOpen(!open);
  };

  const sideContainerVariants = {
    true: {
      width: "15rem",
    },
    false: {
      transition: {
        delay: 0.6,
      },
    },
  };

  const sidebarVariants = {
    true: {},
    false: {
      width: "3rem",
      transition: {
        delay: 0.4,
      },
    },
  };

  const profileVariants = {
    true: {
      alignSelf: "center",
      width: "4rem",
    },
    false: {
      alignSelf: "flex-start",
      marginTop: "2rem",
      width: "3rem",
    },
  };
  return (
    <div className="App">
      <motion.div
        data-Open={open}
        variants={sideContainerVariants}
        initial={`${open}`}
        animate={`${open}`}
        className="sidebar_container"
      >
        {/* sidebar div */}
        <motion.div
          className="sidebar"
          initial={`${open}`}
          animate={`${open}`}
          variants={sidebarVariants}
        >
          {/* lines_icon */}
          <motion.div
            whileHover={{
              scale: 1.2,
              rotate: 180,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(3.5px)",
              WebkitBackdropFilter: "blur(3.5px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              marginBottom: 10,
              transition: {
                delay: 0.2,
                duration: 0.4,
              },
            }}
            onClick={handleToggle}
            className="lines_icon"
          >
            <TocRounded />
          </motion.div>
          {/* profile */}
          <motion.div
            layout
            initial={`${open}`}
            animate={`${open}`}
            variants={profileVariants}
            className="profile"
            transition={{ duration: 0.4 }}
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(5.5px)",
              WebkitBackdropFilter: "blur(5.5px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              cursor: "pointer",
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eW8OvSN4zaimWuFO2ff4Q-Es1FS8ajh4WA&usqp=CAU"
              alt="profile_img"
            />
          </motion.div>
          {/* groups */}
          <div className="groups">
            {/* group 1 */}
            <div className="group">
              <motion.h3
                animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }} className="group_head"
              >
                STOCK PREDICTOR +
              </motion.h3>
              <Item icon={<DashboardRounded />} name="Dashboard" style={{ marginBottom: "10px", marginTop: "10px" }}/>
              <Item icon={<OnlinePredictionRoundedIcon />} name="Predict" style={{ marginBottom: "10px", marginTop: "10px" }}/>
              <Item icon={<ShowChartRoundedIcon />} name="Ticker Details" style={{ marginBottom: "10px", marginTop: "10px" }}/>
            </div>
          </div>

        </motion.div>
      </motion.div>

      <div className="body_container">
     
      </div>
    </div>
  );
}

export default SideBar;
