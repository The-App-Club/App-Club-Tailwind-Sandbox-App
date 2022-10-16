import {css, cx} from '@emotion/css';
import { useRef} from 'react';
import {Scrollama, Step} from 'react-scrollama';
import {MathUtils} from 'three';

import Spacer from '@/components/Spacer';


const ScrollStory2 = () => {
  const mapContainer = useRef(null);
  const prevProgress = useRef(0);

  const clampProgress = ({direction, progress}) => {
    if (direction === 'up') {
      if (isNaN(prevProgress.current)) {
        return 1;
      } else {
        return isNaN(progress) ? 1 : progress;
      }
    } else if (direction === 'down') {
      if (isNaN(prevProgress.current)) {
        return 0;
      } else {
        return isNaN(progress) ? 0 : progress;
      }
    }
  };

  const handleStepEnter = (e) => {
    let {data, progress, direction} = e;
    progress = MathUtils.clamp(progress, 0, 1);

    // console.log(
    //   `[section${data}]`,
    //   clampProgress({direction, progress}),
    //   direction
    // );

    prevProgress.current = progress;
  };

  const handleStepExit = (e) => {};

  const handleStepProgress = (e) => {};

  return (
    <div className="relative">
      <div
        ref={mapContainer}
        className={cx(
          css`
            position: sticky;
            top: calc(
              3rem * 3
            ); // (header height) + navbar height + page header height
            left: 0;
            width: 50%;
            height: calc(100vh - calc(3rem * 3));
            @media (max-width: 768px) {
              top: calc(
                3rem * 2
              ); // (header height) + navbar height + page header height
              height: calc(100vh - calc(3rem * 2));
            }
          `,
          `bg-slate-200`
        )}
      />
      <div
        className={css`
          width: 50%;
          margin-left: 50%;
        `}
      >
        <Scrollama
          offset={0.8}
          onStepEnter={handleStepEnter}
          onStepExit={handleStepExit}
          onStepProgress={handleStepEnter}
          debug={false}
        >
          <Step data={1}>
            <section
              className={cx(
                css`
                  padding: 0.5rem;
                  min-height: 100vh;
                  margin-bottom: 100vh;
                `
              )}
            >
              <h3
                className={cx(
                  css`
                    position: sticky;
                    top: calc(
                      3rem * 3
                    ); // (header height) + navbar height + page header height
                    @media (max-width: 768px) {
                      top: calc(
                        3rem * 2
                      ); // (header height) + navbar height + page header height
                    }
                  `,
                  `bg-white text-xl dark:bg-slate-700`
                )}
              >
                221b Baker St.
              </h3>
              <Spacer height="90vh" />
              <p>
                November 1895. London is shrouded in fog and Sherlock Holmes and
                Watson pass time restlessly awaiting a new case. &quot;The
                London criminal is certainly a dull fellow,&quot; Sherlock
                bemoans. &quot;There have been numerous petty thefts,&quot;
                Watson offers in response. Just then a telegram arrives from
                Sherlock&apos;s brother Mycroft with a mysterious case.
              </p>
            </section>
          </Step>
          <Step data={2}>
            <section
              className={cx(
                css`
                  padding: 0.5rem;
                  min-height: 100vh;
                  margin-bottom: 100vh;
                `
              )}
            >
              <h3
                className={cx(
                  css`
                    position: sticky;
                    top: calc(
                      3rem * 3
                    ); // (header height) + navbar height + page header height
                    @media (max-width: 768px) {
                      top: calc(
                        3rem * 2
                      ); // (header height) + navbar height + page header height
                    }
                  `,
                  `bg-white text-xl dark:bg-slate-700`
                )}
              >
                Aldgate Station
              </h3>
              <Spacer height="90vh" />
              <p>
                Arthur Cadogan West was found dead, head crushed in on train
                tracks at Aldgate Station at 6AM Tuesday morning. West worked at
                Woolwich Arsenal on the Bruce-Partington submarine, a secret
                military project. Plans for the submarine had been stolen and
                seven of the ten missing papers were found in West&apos;s
                possession. Mycroft implores Sherlock to take the case and
                recover the three missing papers.
              </p>
            </section>
          </Step>
          <Step data={3}>
            <section
              className={cx(
                css`
                  padding: 0.5rem;
                  min-height: 100vh;
                  margin-bottom: 100vh;
                `
              )}
            >
              <h3
                className={cx(
                  css`
                    position: sticky;
                    top: calc(
                      3rem * 3
                    ); // (header height) + navbar height + page header height
                    @media (max-width: 768px) {
                      top: calc(
                        3rem * 2
                      ); // (header height) + navbar height + page header height
                    }
                  `,
                  `bg-white text-xl dark:bg-slate-700`
                )}
              >
                London Bridge
              </h3>
              <Spacer height="90vh" />
              <p>
                Holmes and Watson&apos;s investigations take them across London.
                Sherlock deduces that West was murdered elsewhere, then moved to
                Aldgate Station to create the illusion that he was crushed on
                the tracks by a train. On their way to Woolwich Sherlock
                dispatches a telegram to Mycroft at London Bridge: &quot;Send
                list of all foreign spies known to be in England, with full
                address.&quot;
              </p>
            </section>
          </Step>
          <Step data={4}>
            <section
              className={cx(
                css`
                  padding: 0.5rem;
                  min-height: 100vh;
                  margin-bottom: 100vh;
                `
              )}
            >
              <h3
                className={cx(
                  css`
                    position: sticky;
                    top: calc(
                      3rem * 3
                    ); // (header height) + navbar height + page header height
                    @media (max-width: 768px) {
                      top: calc(
                        3rem * 2
                      ); // (header height) + navbar height + page header height
                    }
                  `,
                  `bg-white text-xl dark:bg-slate-700`
                )}
              >
                Woolwich Arsenal
              </h3>
              <Spacer height="90vh" />
              <p>
                While investigating at Woolwich Arsenal Sherlock learns that
                West did not have the three keys&mdash;door, office, and
                safe&mdash;necessary to steal the papers. The train station
                clerk mentions seeing an agitated West boarding the 8:15 train
                to London Bridge. Sherlock suspects West of following someone
                who had access to the Woolwich chief&apos;s keyring with all
                three keys.
              </p>
            </section>
          </Step>
          <Step data={5}>
            <section
              className={cx(
                css`
                  padding: 0.5rem;
                  min-height: 100vh;
                  margin-bottom: 100vh;
                `
              )}
            >
              <h3
                className={cx(
                  css`
                    position: sticky;
                    top: calc(
                      3rem * 3
                    ); // (header height) + navbar height + page header height
                    @media (max-width: 768px) {
                      top: calc(
                        3rem * 2
                      ); // (header height) + navbar height + page header height
                    }
                  `,
                  `bg-white text-xl dark:bg-slate-700`
                )}
              >
                Gloucester Road
              </h3>
              <Spacer height="90vh" />
              <p>
                Mycroft responds to Sherlock&apos;s telegram and mentions
                several spies. Hugo Oberstein of 13 Caulfield Gardens catches
                Sherlock&apos;s eye. He heads to the nearby Gloucester Road
                station to investigate and learns that the windows of Caulfield
                Gardens open over rail tracks where trains stop frequently.
              </p>
            </section>
          </Step>
          <Step data={6}>
            <section
              className={cx(
                css`
                  padding: 0.5rem;
                  min-height: 100vh;
                  margin-bottom: 100vh;
                `
              )}
            >
              <h3
                className={cx(
                  css`
                    position: sticky;
                    top: calc(
                      3rem * 3
                    ); // (header height) + navbar height + page header height
                    @media (max-width: 768px) {
                      top: calc(
                        3rem * 2
                      ); // (header height) + navbar height + page header height
                    }
                  `,
                  `bg-white text-xl dark:bg-slate-700`
                )}
              >
                13 Caulfield Gardens
              </h3>
              <Spacer height="90vh" />
              <p>
                Holmes deduces that the murderer placed West atop a stopped
                train at Caulfield Gardens. The train traveled to Aldgate
                Station before West&apos;s body finally toppled off.
                Backtracking to the criminal&apos;s apartment, Holmes finds a
                series of classified ads from
                <em>The Daily Telegraph</em> stashed away. All are under the
                name Pierrot: &quot;Monday night after nine. Two taps. Only
                ourselves. Do not be so suspicious. Payment in hard cash when
                goods delivered.&quot;
              </p>
            </section>
          </Step>
          <Step data={6}>
            <section
              className={cx(
                css`
                  padding: 0.5rem;
                  min-height: 100vh;
                  margin-bottom: 100vh;
                `
              )}
            >
              <h3
                className={cx(
                  css`
                    position: sticky;
                    top: calc(
                      3rem * 3
                    ); // (header height) + navbar height + page header height
                    @media (max-width: 768px) {
                      top: calc(
                        3rem * 2
                      ); // (header height) + navbar height + page header height
                    }
                  `,
                  `bg-white text-xl dark:bg-slate-700`
                )}
              >
                The Daily Telegraph
              </h3>
              <Spacer height="90vh" />
              <p>
                Holmes and Watson head to The Daily Telegraph and place an ad to
                draw out the criminal. It reads: &quot;To-night. Same hour. Same
                place. Two taps. Most vitally important. Your own safety at
                stake. Pierrot.&quot; The trap works and Holmes catches the
                criminal: Colonel Valentine Walter, the brother of Woolwich
                Arsenal&apos;s chief. He confesses to working for Hugo Oberstein
                to obtain the submarine plans in order to pay off his debts.
              </p>
            </section>
          </Step>
          <Step data={7}>
            <section
              className={cx(
                css`
                  padding: 0.5rem;
                  min-height: 100vh;
                  margin-bottom: 100vh;
                `
              )}
            >
              <h3
                className={cx(
                  css`
                    position: sticky;
                    top: calc(
                      3rem * 3
                    ); // (header height) + navbar height + page header height
                    @media (max-width: 768px) {
                      top: calc(
                        3rem * 2
                      ); // (header height) + navbar height + page header height
                    }
                  `,
                  `bg-white text-xl dark:bg-slate-700`
                )}
              >
                Charing Cross Hotel
              </h3>
              <Spacer height="90vh" />
              <p>
                Walter writes to Oberstein and convinces him to meet in the
                smoking room of the Charing Cross Hotel where he promises
                additional plans for the submarine in exchange for money. The
                plan works and Holmes and Watson catch both criminals.
              </p>
              <small id="citation">
                Adapted from
                <a href="http://www.gutenberg.org/files/2346/2346-h/2346-h.htm">
                  Project Gutenberg
                </a>
              </small>
            </section>
          </Step>
        </Scrollama>
      </div>
    </div>
  );
};

export default ScrollStory2;
