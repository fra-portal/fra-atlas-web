"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import ToggleTheme from "@/components/ui/toggle-theme";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Navbar() {

    // Strict Mode is OFF
    useEffect(() => {
            const collapseBtn = document?.getElementById("collapseBtn")
            collapseBtn?.addEventListener('click', () => {
                const navItems = document?.getElementById("nav-items");
                // const navOptions = document?.getElementById("nav-options");
                navItems?.classList.toggle("hidden");
                navItems?.classList.add("flex", "flex-col");
                // navOptions?.classList.add("flex", "flex-col");

            });
    }, []);

    return (
    <main className="relative w-fill-available p-4 flex items-center flex-col shadow-sm">
      <div className="nav-1 flex w-full">
        <Link href="/" className="border-0 md:border-r-2 border-gray-500">
            <Image className="m-1 pr-5 h-2 max-h-6 dark:invert" src="/next.svg" alt="Logo" width={30} height={20} layout="responsive" />
        </Link>

        <NavigationMenu className="hidden w-max-full ml-5 md:flex flex-1">
        <NavigationMenuList className="items-start">
            <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Home
            </NavigationMenuLink>
            </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
            <Link href="/chats" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Chats
            </NavigationMenuLink>
            </Link>

            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link href="#" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            About Us
            </NavigationMenuLink>
            </Link>

            </NavigationMenuItem>
            <NavigationMenuItem>
            <Link href="/chats" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Contact Us
            </NavigationMenuLink>
            </Link>

            </NavigationMenuItem>

        </NavigationMenuList>
        <div className="ml-auto mr-2 flex flex-1 gap-2 items-center justify-end">
          <Button > SignIn </Button>
          <ToggleTheme />
        </div>
        </NavigationMenu>
        

        <div className="utility-btns ml-auto flex gap-2">
          <div className="md:hidden">
            <ToggleTheme/>
          </div>
          <Button id="collapseBtn" className="p-2 min-w-8 z-10 bg-white text-white hover:none md:hidden">
            <Image className="" src="/hamburger.svg" alt="Menu" width={20} height={30} />
          </Button>
        </div>
        
      </div>

      <div className="absolute bg-background mb-2 top-12 w-screen collapsed-nav md:hidden">
        <NavigationMenu id="nav-items" className="hidden mb-2">
          {/* <NavigationMenuList id="nav-options" className="flex flex-col"> */}
          <NavigationMenuList id="nav-options" className="flex flex-col">
              
              <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
              </NavigationMenuLink>
              </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
              <Link href="/chats" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Chats
              </NavigationMenuLink>
              </Link>

              </NavigationMenuItem>
              <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About Us
              </NavigationMenuLink>
              </Link>

              </NavigationMenuItem>
              <NavigationMenuItem>
              <Link href="/chats" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact Us
              </NavigationMenuLink>
              </Link>

              </NavigationMenuItem>

          </NavigationMenuList>
          <div className="flex items-center" >
            <Button > SignIn </Button>
          </div>
        </NavigationMenu>
      </div>



    </main>
    )
}
