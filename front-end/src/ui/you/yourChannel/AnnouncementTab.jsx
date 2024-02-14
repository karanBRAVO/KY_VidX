"use clinet";

import {
  Typography,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Divider,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const AnnouncementTab = () => {
  const announcements = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      <div className="mb-3">
        {announcements.map((announcement, i) => (
          <Accordion
            key={i}
            className="bg-slate-800 text-white"
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={
                <ArrowDropDownIcon className="text-white font-black text-xl" />
              }
            >
              <Typography variant="h5" component={"h1"} className="text-white">
                Announcement {i + 1}
              </Typography>
            </AccordionSummary>
            <Divider className="bg-black" />
            <AccordionDetails>
              <Typography
                variant="caption"
                component={"p"}
                className="text-base text-slate-300"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                dignissimos laboriosam placeat esse minus ipsam, eum ipsum
                dolorum voluptas qui eligendi voluptatem at ipsa expedita eius
                iste odit obcaecati magnam, beatae dolore. Quis quo quisquam
                dolores impedit maiores atque animi quidem dignissimos? Culpa,
                tempora. Numquam nesciunt ducimus at iure repellat in.
                Repudiandae asperiores nam praesentium magni sed. Nesciunt
                blanditiis eaque vero sapiente voluptates maxime tempore
                repellendus, saepe, fuga vel dolor porro placeat neque provident
                quam. Accusantium quidem iste ex doloribus perferendis nemo quam
                excepturi blanditiis consequuntur beatae saepe quas voluptate
                facilis, voluptates, aperiam harum? Sint quas unde laborum enim
                nobis.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default AnnouncementTab;
