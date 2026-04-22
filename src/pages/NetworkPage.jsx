import { useState } from 'react';
import { suggestedConnections } from '../data/mockData';
import { UserPlus, Users, MessageSquare, Check, Trophy } from 'lucide-react';
import './NetworkPage.css';

const leaderboard = [
  { rank:1, name:'Priya Mehta', score:9840, badge:'🏆', tag:'Top Connector' },
  { rank:2, name:'Rahul Verma', score:8210, badge:'🥈', tag:'Thought Leader' },
  { rank:3, name:'Ananya Krishnan', score:7650, badge:'🥉', tag:'Rising Star' },
  { rank:4, name:'Dr. Sunita Rao', score:7100, badge:'⭐', tag:'Senior Expert' },
  { rank:5, name:'Vikram Patel', score:6890, badge:'⭐', tag:'Quant Wizard' },
];

const communities = [
  { name:'IndiaFintech Builders', members:'14.2k', icon:'💹', joined:true },
  { name:'IIT Alumni Network', members:'42.8k', icon:'🎓', joined:false },
  { name:'Women in Tech India', members:'28.5k', icon:'👩‍💻', joined:true },
  { name:'Senior Tech Professionals', members:'6.3k', icon:'🧑‍💼', joined:false },
  { name:'Startup Founders Circle', members:'9.7k', icon:'🚀', joined:false },
];

function ConnectionCard({ person }) {
  const [status, setStatus] = useState('none'); // none | pending | connected

  return (
    <div className="connection-card card">
      <div className="card-body">
        <div className="flex flex-col items-center" style={{ textAlign:'center', gap:'10px' }}>
          <div
            className="avatar-placeholder avatar-lg"
            style={{ background:`linear-gradient(135deg, ${person.color}, ${person.color}88)` }}
          >
            {person.initials}
          </div>
          <div>
            <p className="fw-700" style={{ fontSize:'14px' }}>{person.name}</p>
            <p className="text-xs text-muted" style={{ marginTop:'3px', lineHeight:'1.4' }}>{person.headline}</p>
          </div>
          <p className="text-xs text-muted">{person.mutual} mutual connections</p>
          <div className="flex gap-2" style={{ width:'100%' }}>
            {status === 'none' && (
              <button
                className="btn btn-outline btn-sm"
                style={{ flex:1, justifyContent:'center' }}
                onClick={() => setStatus('pending')}
              >
                <UserPlus size={13} /> Connect
              </button>
            )}
            {status === 'pending' && (
              <button
                className="btn btn-ghost btn-sm"
                style={{ flex:1, justifyContent:'center', color:'var(--accent-amber)' }}
                disabled
              >
                <Check size={13}/> Pending
              </button>
            )}
            {status === 'connected' && (
              <button className="btn btn-ghost btn-sm" style={{ flex:1, justifyContent:'center' }}>
                <MessageSquare size={13}/> Message
              </button>
            )}
            <button className="btn btn-ghost btn-sm">
              <Users size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NetworkPage() {
  const [joinedCommunities, setJoinedCommunities] = useState(
    communities.reduce((acc, c) => ({ ...acc, [c.name]: c.joined }), {})
  );

  const toggleJoin = (name) => setJoinedCommunities(prev => ({ ...prev, [name]: !prev[name] }));

  return (
    <div className="network-page">
      <div className="network-grid">
        {/* ── SUGGESTIONS ── */}
        <section className="network-section">
          <div className="section-header">
            <h2 className="section-title">
              <UserPlus size={18} className="text-green" /> People You May Know
            </h2>
            <span className="text-sm text-muted">{suggestedConnections.length} suggestions</span>
          </div>
          <div className="connections-grid">
            {suggestedConnections.map(p => (
              <ConnectionCard key={p.id} person={p} />
            ))}
          </div>
        </section>

        {/* ── RIGHT COL ── */}
        <div className="network-right">
          {/* Leaderboard */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={16} style={{ color:'var(--accent-amber)' }} />
                <span className="fw-600" style={{ fontSize:'14px' }}>Network Leaderboard</span>
              </div>
              {leaderboard.map(r => (
                <div key={r.rank} className="leaderboard-row">
                  <span className="leader-rank">{r.badge}</span>
                  <div style={{ flex:1 }}>
                    <p className="text-sm fw-600">{r.name}</p>
                    <p className="text-xs text-muted">{r.tag}</p>
                  </div>
                  <span className="leader-score font-mono">{r.score.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Communities */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-3">
                <Users size={16} className="text-green" />
                <span className="fw-600" style={{ fontSize:'14px' }}>Communities</span>
              </div>
              {communities.map(c => (
                <div key={c.name} className="community-row">
                  <span className="community-icon">{c.icon}</span>
                  <div style={{ flex:1 }}>
                    <p className="text-sm fw-600">{c.name}</p>
                    <p className="text-xs text-muted">{c.members} members</p>
                  </div>
                  <button
                    className={`btn btn-sm ${joinedCommunities[c.name] ? 'btn-ghost' : 'btn-outline'}`}
                    onClick={() => toggleJoin(c.name)}
                  >
                    {joinedCommunities[c.name] ? '✓ Joined' : 'Join'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
