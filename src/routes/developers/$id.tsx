import { createFileRoute } from "@tanstack/react-router";
import { DeveloperDetails } from "@/components/DeveloperDetails";

export const Route = createFileRoute("/developers/$id")({
  component: DeveloperDetails,
});