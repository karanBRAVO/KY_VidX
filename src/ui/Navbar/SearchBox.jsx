import { InputBase, Paper, IconButton, Dialog } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = ({
  isOpen,
  handleClose,
  value,
  setValue,
  onformsubmit = (e) => {
    e.preventDefault();
  },
}) => {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        maxWidth={"lg"}
        sx={{
          ".MuiDialog-paper": {
            bgcolor: "#0000",
            width: "100%",
          },
        }}
      >
        <Paper
          component="form"
          className={
            "flex items-center shadow-none border-[1px] border-solid border-zinc-400 rounded-full bg-zinc-900 w-full"
          }
          onSubmit={onformsubmit}
        >
          <IconButton
            disableRipple
            disableTouchRipple
            disableFocusRipple
            disabled
            aria-label="search"
            className="text-white px-3"
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            className={"w-full mr-3 text-slate-300"}
            placeholder="What you want to search ?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            inputProps={{ "aria-label": "search box" }}
          />
        </Paper>
      </Dialog>
    </>
  );
};

export default SearchBox;
