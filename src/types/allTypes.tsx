export type INavLink = {
  id: number;
  name: string;
  path: string;
};

export type IPost = {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt?: Date | string; // ISO Date String
  };
  

export  interface EditPostModalProps {
    post: IPost;
    onClose: () => void;
    isDuplicate?: boolean; // Ensure isDuplicate is included
  }
  


  export type IEvent = {
    id: string | undefined;
    name?: string;
    slug: string;
    recommend?: boolean;
    startDate: Date;
    startTime?: string;
    mainImage?: string;
    imageZapierLink?: string;
    venueAddress?: string;
    venueNameFrontEnd?: string;
    venueNameBackEnd?: string;
    city?: string;
    bali?: boolean;
    neighborhood?: string;
    lineUp: string[];
    genres: string[];
    details?: string;
    minAge?: number;
    cost?: number;
    promoterMail?: string;
    websiteUrl?: string;
    ticketLink?: string;
    videoLink?: string;
    recurring?: string;
    currency?: string;
    eventsMap?: string;
    catchVenues: string[];
    socialFbLink?: string;
    socialTwLink?: string;
    socialWtLink?: string;
    socialOtherLink?: string;
    meta?: string;
    venue?: string;
    guestlist?: boolean;
    createdAt: Date ; // ISO Date String
    updatedAt: Date ; // ISO Date String;
  };
  
  

export  interface EventFormProps {
  event?: IEvent & { id?: string }; // Made `id` optional
  onClose: () => void;
  isDuplicate?: boolean;
}
  