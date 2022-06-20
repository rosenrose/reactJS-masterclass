import styled from "styled-components";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";

const Nav = styled(motion.nav)`
  width: 100%;
  height: ${(props) => props.theme.headerHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  color: white;
  font-size: 0.8rem;
  padding: 1.2rem 4rem;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  width: 6rem;
  height: 100%;
  margin-right: 3rem;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  gap: 1.2rem;
`;

const Item = styled.li`
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  bottom: -0.8rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Search = styled.span`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 1.5rem;
  }
`;

const Input = styled(motion.input)`
  height: 100%;
  transform-origin: right;
  position: absolute;
  right: 0;
  padding: 1rem 0.5rem;
  padding-left: 2.5rem;
  z-index: -1;
  color: white;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const logoVariants = {
  initial: {
    fillOpacity: 1,
  },
  whileHover: {
    fillOpacity: [1, 0, 1],
    transition: {
      repeat: Infinity,
    },
  },
};

const navVariants = {
  initial: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  animate: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
};

const Header = () => {
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  // console.log(homeMatch, tvMatch);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const toggleSearch = () => {
    inputAnimation.start({
      scaleX: isSearchOpen ? 0 : 1,
      transition: { type: "tween" },
    });
    setIsSearchOpen((prev) => !prev);
  };

  const { scrollY } = useViewportScroll();
  const navAnimation = useAnimation();
  useEffect(() => {
    scrollY.onChange(() => {
      navAnimation.start(scrollY.get() >= 100 ? "animate" : "initial");
    });
  }, []);

  return (
    <Nav variants={navVariants} initial="initial" animate={navAnimation}>
      <Column>
        <Logo xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 276.742" {...logoVariants}>
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">Home</Link>
            {homeMatch && <Circle layoutId="dot" />}
          </Item>
          <Item>
            <Link to="/tv">TV Shows</Link>
            {tvMatch && <Circle layoutId="dot" />}
          </Item>
        </Items>
      </Column>
      <Column>
        <Search>
          <motion.svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={toggleSearch}
            animate={{ x: isSearchOpen ? -180 : 0, transition: { type: "tween" } }}
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            type="text"
            placeholder="Search for movie or tv show"
            initial={{ scaleX: 0 }}
            animate={inputAnimation}
          />
        </Search>
      </Column>
    </Nav>
  );
};

export default Header;
