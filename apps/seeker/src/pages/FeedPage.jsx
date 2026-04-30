import { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, Repeat2, Bookmark, MoreHorizontal } from 'lucide-react';
import { posts } from '../data/mockData';
import { currentUser } from '../data/mockData';
import './FeedPage.css';

function PostCard({ post: initialPost }) {
  const [post, setPost] = useState(initialPost);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setPost(p => ({
    ...p,
    liked: !p.liked,
    likes: p.liked ? p.likes - 1 : p.likes + 1,
  }));

  const content = post.content;
  const isLong = content.length > 200;
  const displayContent = isLong && !expanded ? content.slice(0, 200) + '…' : content;

  return (
    <div className="post-card card fade-in-up">
      <div className="card-body">
        {/* Author */}
        <div className="post-header">
          <div
            className="avatar-placeholder avatar-md"
            style={{ background: `linear-gradient(135deg, ${post.author.color}, ${post.author.color}aa)` }}
          >
            {post.author.initials}
          </div>
          <div className="post-author-info">
            <p className="post-author-name">{post.author.name}</p>
            <p className="text-sm text-muted">{post.author.headline}</p>
            <p className="text-xs text-muted">{post.time}</p>
          </div>
          <button className="post-more-btn"><MoreHorizontal size={18}/></button>
        </div>

        {/* Content */}
        <div className="post-content">
          {displayContent.split('\n').map((line, i) => (
            <p key={i} style={{ marginBottom: line === '' ? '8px' : '0' }}>{line}</p>
          ))}
          {isLong && (
            <button className="read-more-btn" onClick={() => setExpanded(v => !v)}>
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="post-stats">
          <span>
            <span className="like-icon">👍</span>
            {post.likes.toLocaleString()} · {post.comments} comments
          </span>
          <span>{post.reposts} reposts</span>
        </div>

        <div className="divider" />

        {/* Actions */}
        <div className="post-actions">
          <button
            className={`post-action ${post.liked ? 'liked' : ''}`}
            onClick={toggle}
          >
            <ThumbsUp size={17} />
            <span>Like {post.liked && <span className="liked-count">({post.likes})</span>}</span>
          </button>
          <button className="post-action">
            <MessageSquare size={17} />
            <span>Comment</span>
          </button>
          <button className="post-action">
            <Repeat2 size={17} />
            <span>Repost</span>
          </button>
          <button className="post-action">
            <Share2 size={17} />
            <span>Share</span>
          </button>
          <button
            className={`post-action save-btn ${saved ? 'saved' : ''}`}
            onClick={() => setSaved(v => !v)}
            style={{ marginLeft:'auto' }}
          >
            <Bookmark size={17} fill={saved ? 'var(--accent-amber)' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}

function CreatePost() {
  const [text, setText] = useState('');
  return (
    <div className="create-post card">
      <div className="card-body">
        <div className="create-post-row">
          <div className="avatar-placeholder avatar-md">{currentUser.initials}</div>
          <input
            className="create-post-input"
            placeholder="Share a post, article, or idea…"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        {text && (
          <div className="create-post-footer">
            <button className="btn btn-primary btn-sm" onClick={() => setText('')}>
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FeedPage() {
  return (
    <div className="feed-layout">
      {/* Left sidebar */}
      <aside className="feed-sidebar-left">
        <ProfileCard />
      </aside>

      {/* Main feed */}
      <main className="feed-main">
        <CreatePost />
        {posts.map((p, i) => (
          <div key={p.id} className={`delay-${i+1}`} style={{ animationDelay:`${i*0.08}s` }}>
            <PostCard post={p} />
          </div>
        ))}
      </main>

      {/* Right sidebar */}
      <aside className="feed-sidebar-right">
        <MarketPanel />
        <TrendingPanel />
      </aside>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="card profile-card-widget">
      <div className="profile-banner-widget" />
      <div className="card-body" style={{ paddingTop: 0 }}>
        <div className="profile-avatar-widget">
          <img src="/mango-avatar.png" alt="Akshar Modi" className="avatar avatar-lg"
            style={{ border:'3px solid var(--bg-card)' }}
          />
        </div>
        <h3 style={{ fontSize:'15px', marginTop:'8px' }}>{currentUser.name}</h3>
        <p className="text-sm text-muted" style={{ lineHeight:'1.4' }}>{currentUser.headline}</p>
        <div className="divider" />
        <div className="profile-stat-row">
          <span className="text-sm text-muted">Connections</span>
          <span className="fw-600 text-green">{currentUser.connections}</span>
        </div>
        <div className="profile-stat-row mt-2">
          <span className="text-sm text-muted">Profile Views</span>
          <span className="fw-600 text-blue">248</span>
        </div>
        <div className="profile-stat-row mt-2">
          <span className="text-sm text-muted">Post Impressions</span>
          <span className="fw-600" style={{ color:'var(--accent-amber)' }}>1.2k</span>
        </div>
        <div className="divider" />
        <button className="btn btn-outline" style={{ width:'100%', justifyContent:'center', fontSize:'12px' }}>
          View Full Profile
        </button>
      </div>
    </div>
  );
}

import { marketStats } from '../data/mockData';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';

function MarketPanel() {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center gap-2 mb-3">
          <BarChart2 size={16} className="text-green" />
          <span className="fw-600" style={{ fontSize:'13px' }}>Job Market Pulse</span>
          <span className="live-dot" style={{ marginLeft:'auto' }} />
        </div>
        {marketStats.map(s => (
          <div key={s.label} className="market-stat-row">
            <span className="text-sm text-muted">{s.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono fw-600 text-sm">{s.value}</span>
              <span className={`text-xs ${s.up ? 'text-green' : 'text-red'}`}>
                {s.up ? <TrendingUp size={11}/> : <TrendingDown size={11}/>}
                {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendingPanel() {
  const trends = [
    '#ReactJS · 12.4k posts',
    '#AIInIndia · 8.7k posts',
    '#InternshipHunt · 5.2k posts',
    '#SeniorTech · 3.1k posts',
    '#StartupIndia · 24k posts',
  ];

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={16} className="text-green" />
          <span className="fw-600" style={{ fontSize:'13px' }}>Trending Topics</span>
        </div>
        {trends.map((t, i) => (
          <div key={i} className="trending-item">
            <span className="trending-rank">0{i + 1}</span>
            <span className="trending-text">{t.split(' · ')[0]}</span>
            <span className="text-xs text-muted">{t.split(' · ')[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
