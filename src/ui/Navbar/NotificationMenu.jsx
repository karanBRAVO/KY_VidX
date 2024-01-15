import { Typography, Menu, MenuItem, Avatar, Box } from "@mui/material";

const NotificationMenu = ({ isMenuOpen, handleMenuClose, anchorEl }) => {
  const menuItems = [
    {
      imgSrc: "/defaultThumbnail.jpg",
      text: "How to create an Umbrella Drone",
      time: "1 hour",
      desc: "This is test description ...",
    },
    {
      imgSrc: "/defaultThumbnail.jpg",
      text: "What the heck is AI(Artificial Intelligence)???",
      time: "3 days",
      desc: "This is test description ...",
    },
    {
      imgSrc: "/defaultThumbnail.jpg",
      text: "How to do your first open source contribution",
      time: "10 days",
      desc: "This is test description ...",
    },
  ];

  return (
    <>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "notification-menu-button",
        }}
        sx={{
          ".MuiMenu-paper": {
            bgcolor: "white",
            color: "black",
            maxHeight: "50vh",
          },
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            className="hover:bg-zinc-300 flex flex-row items-start"
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Avatar
                src={item.imgSrc}
                alt="/"
                className="w-11 h-11 mx-1 border-2 border-solid border-white"
              />
              <Typography
                variant="caption"
                component={"span"}
                className="text-xs m-[.5px]"
              >
                {item.time} ago
              </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography
                variant="subtitle2"
                component={"span"}
                className="text-black font-bold text-sm"
              >
                {item.text}
              </Typography>
              <Typography
                variant="caption"
                component={"span"}
                className="text-xs m-1"
              >
                {item.desc}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NotificationMenu;
