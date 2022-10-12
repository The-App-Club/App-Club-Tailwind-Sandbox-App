import {css, cx} from '@emotion/css';
import {MdOutlineQuickreply, MdOutlineTimeline} from 'react-icons/md';
// https://dev.to/readymadecode/timeline-component-in-react-81c
import {
  MdFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineLocationOn,
} from 'react-icons/md';
import Comment from './Comment';
import Spacer from './Spacer';

import {default as chance} from 'chance';

const data = [
  {
    userName: 'Betty Gomez',
    avatorURL:
      'https://robohash.org/f11169c4a5f32aff7ef135d992475cdf?set=set1&bgset=&size=200x200',
    parentCommentId: null,
    commentId: 2916,
    createdAt: '2022/10/10 11:25:23',
    updatedAt: '2022/10/10 11:25:23',
    text: 'Neghizab liigdok pidewe we fiz bovhezuh gut baef gel hugzal cedac ca heez mejod ikpuneh abarerpa hibaru ezsewor ikci ki ofemunuru azaco rir we pizuvhe ufahu ad rodnojhib an kebuz.',
  },
  {
    userName: 'Gavin McKinney',
    avatorURL:
      'https://robohash.org/dbf63edd38f5f80c734b44e459098793?set=set4&bgset=&size=200x200',
    parentCommentId: 2916,
    commentId: 5351,
    createdAt: '2022/10/10 11:25:23',
    updatedAt: '2022/10/10 11:25:23',
    text: 'Ohkinha emamdo lagwog iv bucgul ibfavu nur efsiduk uwnebdo api wavku hasutokon nuhkekoh uve uppilwu.',
  },
  {
    userName: 'Cecilia Garner',
    avatorURL:
      'https://robohash.org/89efa8f0f8c11cc766ea4750ec3ef2ae?set=set1&bgset=&size=200x200',
    parentCommentId: 2916,
    commentId: 4809,
    createdAt: '2022/10/10 11:25:23',
    updatedAt: '2022/10/10 11:25:23',
    text: 'Ezooga hopi avdi hi suvil wuhu wiomo za ki wih joji dis fin mepkuc adazo gav loce ci funpotoma degojol.',
  },
  {
    userName: 'Julian Burns',
    avatorURL:
      'https://robohash.org/c8a4e89b2b8771d221ff4a37ea2b5c49?set=set1&bgset=&size=200x200',
    parentCommentId: null,
    commentId: 5457,
    createdAt: '2022/10/10 11:25:23',
    updatedAt: '2022/10/10 11:25:23',
    text: 'Av al cicorseb mili fubjowuh puereruv gu iz hacuvob noje fewi wulfurmo sudetime ac goesulo bi mel cij ovizeral re jejwe kodzednow siv iveku popecef ebtiv cucjep lajesip zukav agarefum.',
  },
  {
    userName: 'Sarah Murray',
    avatorURL:
      'https://robohash.org/deb71d3b41fd2d3f6f5e10c979184481?set=set1&bgset=&size=200x200',
    parentCommentId: 5457,
    commentId: 619,
    createdAt: '2022/10/10 11:25:23',
    updatedAt: '2022/10/10 11:25:23',
    text: 'Igatava ruhmi ceg id irohlup huakjov zomuw sampuz go dupizzo eb kac lalvel fumbevawa hohogane mozmod jis nu hedsitoh weramteh feh igipalug ru becsocor pu pokma liava sovujuve sombuhoc vu.',
  },
  {
    userName: 'Isaiah Holland',
    avatorURL:
      'https://robohash.org/1eff904e794a16ec6f01e1ff72db1d1e?set=set4&bgset=&size=200x200',
    parentCommentId: null,
    commentId: 4813,
    createdAt: '2022/10/10 11:25:23',
    updatedAt: '2022/10/10 11:25:23',
    text: 'Zevoz wibu zackolube be puh had liuhjej sonudav diteif pollopnuh somi uzgih tec wapgi femebode bu vinapidas biduj zatutira bektawni.',
  },
  {
    userName: 'Lottie Snyder',
    avatorURL:
      'https://robohash.org/8f843681b09ac0691cfda9cca4e57e1c?set=set4&bgset=&size=200x200',
    parentCommentId: null,
    commentId: 6576,
    createdAt: '2022/10/10 11:25:23',
    updatedAt: '2022/10/10 11:25:23',
    text: 'Min gin zetteddiv legesa zacihbu vilulno za zo gisoewu beiloge hotiwahe hub gi sajoswo efuhune duv gej juvuj vojsa muvdelkiv doem odha dolzovuno wik ukianti ag okgela zicabu liddik behpezla.',
  },
  {
    userName: 'Birdie Rose',
    avatorURL:
      'https://gravatar.com/avatar/9da1906aa95acfe45584b89787ba799b?s=200&d=robohash&r=x',
    parentCommentId: 4813,
    commentId: 7555,
    createdAt: '2022/10/10 11:25:23',
    updatedAt: '2022/10/10 11:25:23',
    text: 'Adapam inogow topi rirfe tepwopiz jitlisun tijzup kislam ravalfes boitcek pi oclouj ukgozop re cuwoh wucdivpeh barod futvudi rutnecpa onofetas cewez behbosvac ih meov jaf vi miluri amfemduw pafga howfedot.',
  },
];

const CommentTimeline = () => {
  return (
    <div
      className={cx(
        'w-full max-w-2xl',
        `border-2 border-gray-200 dark:border-slate-500`,
        `bg-white dark:bg-slate-700 shadow-2xl rounded-xl`,
        css`
          min-height: calc(100vh + 34rem); // mock attach
        `
      )}
    >
      <h2
        className={cx(
          `text-lg flex items-center justify-start gap-1 px-2`,
          `border-b-2 border-gray-200 dark:border-slate-500`,
          css`
            min-height: 3rem;
          `
        )}
      >
        <MdOutlineTimeline size={24} />
        Timeline
      </h2>
      <div className={`w-full p-2`}>
        {data.map((item, index) => {
          return <Comment data={item} key={index} />;
        })}
      </div>
      <Spacer height="50vh" />
    </div>
  );
};

export default CommentTimeline;
