"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";
import { useCalEmbed } from "@/app/hooks/useCalEmbed";
import { CONSTANTS } from "@/constants/links";
import { getUserDetails } from "@/app/_data/user";
import { HeaderAccountDropdown } from "./header-account-dropdown";

interface NavbarProps {
  navItems: {
    name: string;
    link: string;
  }[];
  visible: boolean;
  user: UserDetails | null;
  isLoading: boolean;
}

interface UserDetails {
  id: string;
  email: string | undefined;
}

export const Navbar = () => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const userDetails = await getUserDetails();
      setUser(userDetails);
      setIsLoading(false);
    }
    fetchUser();
  }, []);

  const navItems = [
    {
      name: "Picks",
      link: "/picks",
    },
    {
      name: "MDL Metrics",
      link: "/model-analytics",
    },
    {
      name: "Betting",
      link: "/betting",
    },
    // {
    //   name: "Apply",
    //   link: "/apply",
    // },
  ];

  const navItemsWithPricing = user
    ? [
        ...navItems,
        // {
        //   name: "Pricing",
        //   link: "/pricing",
        // },
      ]
    : navItems;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div ref={ref} className="w-full fixed top-0 inset-x-0 z-50">
      <DesktopNav visible={visible} navItems={navItemsWithPricing} user={user} isLoading={isLoading} />
      <MobileNav visible={visible} navItems={navItemsWithPricing} user={user} isLoading={isLoading} />
    </motion.div>
  );
};

const DesktopNav = ({ navItems, visible, user, isLoading }: NavbarProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const calOptions = useCalEmbed({
    namespace: CONSTANTS.CALCOM_NAMESPACE,
    styles: {
      branding: {
        brandColor: CONSTANTS.CALCOM_BRAND_COLOR,
      },
    },
    hideEventTypeDetails: CONSTANTS.CALCOM_HIDE_EVENT_TYPE_DETAILS,
    layout: CONSTANTS.CALCOM_LAYOUT,
  });

  return (
    <motion.div
      onMouseLeave={() => {
        setHovered(null);
      }}
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "hidden lg:flex flex-row self-start bg-transparent dark:bg-transparent items-center justify-between py-2 max-w-7xl mx-auto px-4 rounded-md relative z-[60] w-full",
        visible && "bg-white/80 dark:bg-neutral-950/80"
      )}
    >
      <Logo />
      <motion.div className="lg:flex flex-row flex-1 absolute inset-0 hidden items-center justify-center space-x-2 lg:space-x-2 text-sm text-zinc-600 font-medium hover:text-zinc-800 transition duration-200">
        {navItems.map((navItem: any, idx: number) => (
          <Link
            onMouseEnter={() => setHovered(idx)}
            className="text-neutral-600 dark:text-neutral-300 relative px-4 py-2"
            key={`link=${idx}`}
            href={navItem.link}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="w-full h-full absolute inset-0 bg-gray-100 dark:bg-neutral-800 rounded-md"
              />
            )}
            <span className="relative z-20">{navItem.name}</span>
          </Link>
        ))}
      </motion.div>
      <div className="flex items-center gap-4 z-20">
        {/* {!isLoading && (
          user ? (
            <HeaderAccountDropdown user={user} />
          ) : (
            <Button
              as={Link}
              href="/auth/sign-in"
              variant="secondary"
              className="hidden md:block"
            >
              Login
            </Button>
          )
        )} */}
      </div>
    </motion.div>
  );
};

const MobileNav = ({ navItems, visible, user, isLoading }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const calOptions = useCalEmbed({
    namespace: "chat-with-manu-demo",
    styles: {
      branding: {
        brandColor: "#000000",
      },
    },
    hideEventTypeDetails: false,
    layout: "month_view",
  });

  return (
    <>
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          width: visible ? "90%" : "100%",
          y: visible ? 20 : 0,
          borderRadius: open ? "4px" : "2rem",
          paddingRight: visible ? "12px" : "0px",
          paddingLeft: visible ? "12px" : "0px",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className={cn(
          "flex relative flex-col lg:hidden w-full justify-between items-center bg-transparent max-w-[calc(100vw-2rem)] mx-auto px-0 py-2 z-50",
          visible && "bg-white/80 dark:bg-neutral-950/80"
        )}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <div className="hidden sm:block">
            <Logo />
          </div>
          <div className="sm:hidden flex-1" />
          {open ? (
            <IconX
              className="text-black dark:text-white"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <IconMenu2
              className="text-black dark:text-white"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex rounded-sm absolute top-16 bg-white dark:bg-neutral-950 inset-x-0 z-50 flex-col items-start justify-start gap-4 w-full px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            >
              {navItems.map((navItem: any, idx: number) => (
                <Link
                  key={`link=${idx}`}
                  href={navItem.link}
                  onClick={() => setOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <motion.span className="block">{navItem.name} </motion.span>
                </Link>
              ))}
              {/* {!isLoading && (
                user ? (
                  <HeaderAccountDropdown user={user} />
                ) : (
                  <Button
                    as={Link}
                    onClick={() => setOpen(false)}
                    href="/auth/sign-in"
                    variant="primary"
                    className="block md:hidden w-full"
                  >
                    Login
                  </Button>
                )
              )} */}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};