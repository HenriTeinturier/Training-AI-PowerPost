import { create } from "zustand";

export enum StageName {
  Fetching = "fetching",
  GeneratingCover = "cover",
  CreatingPost = "create",
  FindingTitle = "title",
  PublishingPost = "publish",
}

export type Stage = {
  name: StageName;
  title: string;
  description: string;
  loading: boolean;
  done: boolean;
};

type LoadingStore = {
  stages: Stage[];
  stageInProgress: Stage | null;
  startLoading: (name: StageName) => void;
  finishLoading: (name: StageName) => void;
  reset: () => void;
};

const stages: Stage[] = [
  {
    name: StageName.Fetching,
    title: "Fetching post",
    description: "Fetching post from source",
    loading: false,
    done: false,
  },
  {
    name: StageName.GeneratingCover,
    title: "Generating cover",
    description: "Generating cover for post",
    loading: false,
    done: false,
  },
  {
    name: StageName.CreatingPost,
    title: "Creating post",
    description: "Creating post with GPT 3.5 turbo",
    loading: false,
    done: false,
  },
  {
    name: StageName.FindingTitle,
    title: "Finding title",
    description: "Finding title for post",
    loading: false,
    done: false,
  },
  {
    name: StageName.PublishingPost,
    title: "Publishing post",
    description: "Publishing post in your PowerPost list",
    loading: false,
    done: false,
  },
];
const usePostCreationStatus = create<LoadingStore>((set) => ({
  stages: [...stages],
  stageInProgress: null,
  startLoading: (name) => {
    set((state) => ({
      stages: state.stages.map((stage) => {
        if (stage.name === name) {
          return {
            ...stage,
            loading: true,
          };
        }
        return stage;
      }),
    }));
    set((state) => ({
      stageInProgress:
        state.stages.find((stage) => stage.name === name) || null,
    }));
  },
  finishLoading: (name) => {
    set((state) => ({
      stages: state.stages.map((stage) => {
        if (stage.name === name) {
          return {
            ...stage,
            loading: false,
            done: true,
          };
        }

        return stage;
      }),
    }));
  },
  reset: () => {
    set((state) => ({
      stages: state.stages.map((stage) => ({
        ...stage,
        loading: false,
        done: false,
      })),
      stageInProgress: null,
    }));
  },
}));

export default usePostCreationStatus;
