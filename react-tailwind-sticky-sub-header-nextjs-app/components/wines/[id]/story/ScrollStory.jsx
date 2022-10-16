import {css, cx} from '@emotion/css';
import {useCallback,useEffect,useRef} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import mapboxgl from 'mapbox-gl';

import Spacer from '@/components/Spacer';
import ScrollStorySection from '@/components/wines/[id]/story/ScrollStorySection';

const chapters = {
  baker: {
    bearing: 27,
    center: [-0.15591514, 51.51830379],
    zoom: 15.5,
    pitch: 20,
  },
  aldgate: {
    duration: 6000,
    center: [-0.07571203, 51.51424049],
    bearing: 150,
    zoom: 15,
    pitch: 0,
  },
  'london-bridge': {
    bearing: 90,
    center: [-0.08533793, 51.50438536],
    zoom: 13,
    speed: 0.6,
    pitch: 40,
  },
  woolwich: {
    bearing: 90,
    center: [0.05991101, 51.48752939],
    zoom: 12.3,
  },
  gloucester: {
    bearing: 45,
    center: [-0.18335806, 51.49439521],
    zoom: 15.3,
    pitch: 20,
    speed: 0.5,
  },
  'caulfield-gardens': {
    bearing: 180,
    center: [-0.19684993, 51.5033856],
    zoom: 12.3,
  },
  telegraph: {
    bearing: 90,
    center: [-0.10669358, 51.51433123],
    zoom: 17.3,
    pitch: 40,
  },
  'charing-cross': {
    bearing: 90,
    center: [-0.12416858, 51.50779757],
    zoom: 14.3,
    pitch: 20,
  },
};

const ScrollStory = () => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (mapInstance.current) return; // only once initialize
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const mapboxglInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-0.15591514, 51.51830379],
      zoom: 15.5,
      bearing: 27,
      pitch: 45,
    });

    // Create a default Marker and add it to the mapInstance.
    marker.current = new mapboxgl.Marker()
      .setLngLat([-0.15591514, 51.51830379])
      .addTo(mapboxglInstance);

    const language = new MapboxLanguage();
    mapboxglInstance.addControl(language);
    mapInstance.current = mapboxglInstance;
  }, []);

  const doMarked = useCallback(({activeChapterName, inView}) => {
    if (inView) {
      mapInstance.current.flyTo(chapters[activeChapterName]);
      marker.current.setLngLat(chapters[activeChapterName].center);
    }
  }, []);

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
          `bg-white`
        )}
      />
      <div
        className={css`
          width: 50%;
          margin-left: 50%;
        `}
      >
        <ScrollStorySection chapterName={'baker'} doMarked={doMarked}>
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
              `bg-white text-xl dark:bg-slate-700 shadow-md p-2`
            )}
          >
            221b Baker St.
          </h3>
          <Spacer height="90vh" />
          <p className={cx(`bg-white dark:bg-slate-700 shadow-md p-2`)}>
            November 1895. London is shrouded in fog and Sherlock Holmes and
            Watson pass time restlessly awaiting a new case. &quot;The London
            criminal is certainly a dull fellow,&quot; Sherlock bemoans.
            &quot;There have been numerous petty thefts,&quot; Watson offers in
            response. Just then a telegram arrives from Sherlock&apos;s brother
            Mycroft with a mysterious case.
          </p>
        </ScrollStorySection>
        <ScrollStorySection chapterName="aldgate" doMarked={doMarked}>
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
              `bg-white text-xl dark:bg-slate-700 shadow-md p-2`
            )}
          >
            Aldgate Station
          </h3>
          <Spacer height="90vh" />
          <p className={cx(`bg-white dark:bg-slate-700 shadow-md p-2`)}>
            Arthur Cadogan West was found dead, head crushed in on train tracks
            at Aldgate Station at 6AM Tuesday morning. West worked at Woolwich
            Arsenal on the Bruce-Partington submarine, a secret military
            project. Plans for the submarine had been stolen and seven of the
            ten missing papers were found in West&apos;s possession. Mycroft
            implores Sherlock to take the case and recover the three missing
            papers.
          </p>
        </ScrollStorySection>
        <ScrollStorySection chapterName="london-bridge" doMarked={doMarked}>
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
              `bg-white text-xl dark:bg-slate-700 shadow-md p-2`
            )}
          >
            London Bridge
          </h3>
          <Spacer height="90vh" />
          <p className={cx(`bg-white dark:bg-slate-700 shadow-md p-2`)}>
            Holmes and Watson&apos;s investigations take them across London.
            Sherlock deduces that West was murdered elsewhere, then moved to
            Aldgate Station to create the illusion that he was crushed on the
            tracks by a train. On their way to Woolwich Sherlock dispatches a
            telegram to Mycroft at London Bridge: &quot;Send list of all foreign
            spies known to be in England, with full address.&quot;
          </p>
        </ScrollStorySection>
        <ScrollStorySection chapterName="woolwich" doMarked={doMarked}>
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
              `bg-white text-xl dark:bg-slate-700 shadow-md p-2`
            )}
          >
            Woolwich Arsenal
          </h3>
          <Spacer height="90vh" />
          <p className={cx(`bg-white dark:bg-slate-700 shadow-md p-2`)}>
            While investigating at Woolwich Arsenal Sherlock learns that West
            did not have the three keys&mdash;door, office, and
            safe&mdash;necessary to steal the papers. The train station clerk
            mentions seeing an agitated West boarding the 8:15 train to London
            Bridge. Sherlock suspects West of following someone who had access
            to the Woolwich chief&apos;s keyring with all three keys.
          </p>
        </ScrollStorySection>
        <ScrollStorySection chapterName="gloucester" doMarked={doMarked}>
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
              `bg-white text-xl dark:bg-slate-700 shadow-md p-2`
            )}
          >
            Gloucester Road
          </h3>
          <Spacer height="90vh" />
          <p className={cx(`bg-white dark:bg-slate-700 shadow-md p-2`)}>
            Mycroft responds to Sherlock&apos;s telegram and mentions several
            spies. Hugo Oberstein of 13 Caulfield Gardens catches
            Sherlock&apos;s eye. He heads to the nearby Gloucester Road station
            to investigate and learns that the windows of Caulfield Gardens open
            over rail tracks where trains stop frequently.
          </p>
        </ScrollStorySection>
        <ScrollStorySection chapterName="caulfield-gardens" doMarked={doMarked}>
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
              `bg-white text-xl dark:bg-slate-700 shadow-md p-2`
            )}
          >
            13 Caulfield Gardens
          </h3>
          <Spacer height="90vh" />
          <p className={cx(`bg-white dark:bg-slate-700 shadow-md p-2`)}>
            Holmes deduces that the murderer placed West atop a stopped train at
            Caulfield Gardens. The train traveled to Aldgate Station before
            West&apos;s body finally toppled off. Backtracking to the
            criminal&apos;s apartment, Holmes finds a series of classified ads
            from
            <em>The Daily Telegraph</em> stashed away. All are under the name
            Pierrot: &quot;Monday night after nine. Two taps. Only ourselves. Do
            not be so suspicious. Payment in hard cash when goods
            delivered.&quot;
          </p>
        </ScrollStorySection>
        <ScrollStorySection chapterName="telegraph" doMarked={doMarked}>
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
              `bg-white text-xl dark:bg-slate-700 shadow-md p-2`
            )}
          >
            The Daily Telegraph
          </h3>
          <Spacer height="90vh" />
          <p className={cx(`bg-white dark:bg-slate-700 shadow-md p-2`)}>
            Holmes and Watson head to The Daily Telegraph and place an ad to
            draw out the criminal. It reads: &quot;To-night. Same hour. Same
            place. Two taps. Most vitally important. Your own safety at stake.
            Pierrot.&quot; The trap works and Holmes catches the criminal:
            Colonel Valentine Walter, the brother of Woolwich Arsenal&apos;s
            chief. He confesses to working for Hugo Oberstein to obtain the
            submarine plans in order to pay off his debts.
          </p>
        </ScrollStorySection>
        <ScrollStorySection chapterName="charing-cross" doMarked={doMarked}>
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
              `bg-white text-xl dark:bg-slate-700 shadow-md p-2`
            )}
          >
            Charing Cross Hotel
          </h3>
          <Spacer height="90vh" />
          <p className={cx(`bg-white dark:bg-slate-700 shadow-md p-2`)}>
            Walter writes to Oberstein and convinces him to meet in the smoking
            room of the Charing Cross Hotel where he promises additional plans
            for the submarine in exchange for money. The plan works and Holmes
            and Watson catch both criminals.
          </p>
          <small id="citation">
            Adapted from
            <a href="http://www.gutenberg.org/files/2346/2346-h/2346-h.htm">
              Project Gutenberg
            </a>
          </small>
          <Spacer height="100vh" />
        </ScrollStorySection>
      </div>
    </div>
  );
};

export default ScrollStory;
