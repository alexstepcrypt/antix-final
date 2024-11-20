export type faqItemsTypes = {
   id: number;
   title: string;
   content: string | React.ReactNode;
}

export const faqItems: faqItemsTypes[] = [
   {
      id: 1,
      title: 'What is a Deposit?',
      content: 'A deposit secures your place in Stage 1 of the token sale, giving you access to ANTIX tokens at the best price. Tokens are limited in this stage and offered on a first-come, first-served basis.'
   },
   {
      id: 2,
      title: 'When Can I Purchase Tokens?',
      content: 'Token purchases will open at the start of Stage 1. Refer to the timer on the main page and dashboard, and set a reminder with our Telegram bot to ensure you don’t miss out.'
   },
   {
      id: 3,
      title: 'When Will I Receive My Tokens?',
      content: 'ANTIX tokens have a lock-up and vesting schedule to manage supply pressure. Initial unlocks of 5-10% (depending on purchase stage) will occur at the Token Generation Event (TGE).'
   },
   {
      id: 4,
      title: 'More Questions?',
      content: (
         <>
            Reach out to us anytime through our{" "}
            <a href="https://t.me/antixtoken_bot" rel='noopener' target='_blank'>Telegram support bot</a> for additional assistance.
         </>
      ),
   },
]
