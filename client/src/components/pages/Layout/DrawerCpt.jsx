import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

const card = (
  <Card className="mt-14 w-96 ">
    <CardBody>
      <Typography variant="h5" color="blue-gray" className="mb-2">
        UI/UX Review Check
      </Typography>
      <Typography>
        The place is close to Barceloneta Beach and bus stop just 2 min by walk
        and near to &quot;Naviglio&quot; where you can enjoy the main night life
        in Barcelona.
      </Typography>
    </CardBody>
    <CardFooter className="pt-0">
      <Button>Read More</Button>
    </CardFooter>
  </Card>
);

export function DrawerCpt({ props }) {
  const { open, closeDrawer, openDrawer } = props;
 
  return (
    <React.Fragment>
      <Drawer
        open={open}
        placement="right"
        onClose={closeDrawer}
        className="p-4"
      >
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Your Basket is here
          </Typography>
          <IconButton
            variant="text"
            className=""
            color="blue-gray"
            onClick={closeDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="h-screen mb-56 flex flex-col overflow-y-auto">
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default DrawerCpt;
