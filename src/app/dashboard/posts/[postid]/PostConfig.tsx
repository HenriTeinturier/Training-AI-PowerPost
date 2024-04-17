"use client";
import { useProseConfig } from "@/app/hook/Posts/useProseConfig";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { ALargeSmall, ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

const PostConfig = () => {
  const [open, setOpen] = useState<string>("");
  const config = useProseConfig();
  return (
    <Card>
      <Accordion type="single" value={open} onValueChange={setOpen}>
        <AccordionItem value="random">
          <AccordionContent className="p-2">
            <Card className="flex flex-col items-start p-2 gap-2">
              <Label>Size</Label>
              <ToggleGroup
                type="single"
                value={config.size}
                onValueChange={(v) => {
                  config.setConfig({ size: v as never });
                }}
              >
                <ToggleGroupItem value="sm">
                  <ALargeSmall size={14} />
                </ToggleGroupItem>
                <ToggleGroupItem value="default">
                  <ALargeSmall size={20} />
                </ToggleGroupItem>
                <ToggleGroupItem value="lg">
                  <ALargeSmall size={24} />
                </ToggleGroupItem>
                <ToggleGroupItem value="xl">
                  <ALargeSmall size={30} />
                </ToggleGroupItem>
              </ToggleGroup>
            </Card>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="random">
          <AccordionTrigger
            className="w-full"
            onClick={() => {
              setOpen((p) => (p ? "" : "random"));
            }}
            asChild
          >
            <Button size="sm" variant="ghost" className="w-full">
              {open === "random" ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              )}
            </Button>
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default PostConfig;
