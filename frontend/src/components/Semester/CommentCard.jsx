import React, { Fragment, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PartialComponent from './PartialComponent.jsx'
import ArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

const CommentCard = ({ itemComm, isAuthenticated, forCmp }) => {
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [bound, setBound] = useState(5)


  const hanldeCommentsToggle = () => {
    setBound(bound + 5)
  }

  return (
    <Fragment>
      <div className="comment-box" style={{ alignItems: 'start' }}>
        <div className="profile" style={{ background: `url(${itemComm.profileImg}) no-repeat center/cover` }}>
        </div>
        <div className="comment-details" style={{
          borderRight: itemComm.sentiment === "Positive" ? '3px solid #3dec3d' :
            itemComm.sentiment === "Negative" ? '3px solid #ff6767' : '3px solid #b9b9b9', borderRadius: '4px'
        }}>
          <PartialComponent itemComm={itemComm} item={itemComm} isAuthenticated={isAuthenticated} forCmp={forCmp} />

          {itemComm.replies.length > 0 && <p className='n-replies' onClick={() => setShowAllReplies(!showAllReplies)}>
            <ArrowDropDownIcon style={{ transform: showAllReplies ? 'rotate(180deg)' : null }} />
            {itemComm.replies.length} replies</p>}

          {showAllReplies
            && itemComm.replies.map((replyItem, index) => {
              return (
                <div>
                  {
                    index < bound &&
                    <div className="comment-box" style={{ alignItems: 'start' }}>
                      <div className="profile" style={{ background: `url(${replyItem.profileImg}) no-repeat center/cover` }}>
                      </div>
                      <div className="comment-details" style={{
                        borderRight: replyItem.sentiment === "Positive" ? '3px solid #3dec3d' :
                        replyItem.sentiment === "Negative" ? '3px solid #ff6767' : '3px solid #b9b9b9', borderRadius: '4px'
                      }}>
                        <PartialComponent item={replyItem} itemComm={itemComm} isAuthenticated={isAuthenticated} from={'rpy'} forCmp={forCmp} />
                      </div>
                    </div>
                  }
                </div>

              );
            })

          }

          {showAllReplies && bound < itemComm.replies.length && <p className='n-replies' onClick={hanldeCommentsToggle}> <ArrowRightIcon />
            Show more replies</p>}

        </div>
      </div>
    </Fragment>
  )
}

export default CommentCard