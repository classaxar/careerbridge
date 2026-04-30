import { useState } from 'react';
import { Send, Search, Circle, Phone, Video, MoreHorizontal } from 'lucide-react';
import './MessagesPage.css';

const contacts = [
  { id:'m1', name:'Priya Mehta', preview:'Great talking to you!', time:'2m', unread:2, active:true, initials:'PM', color:'#2962ff' },
  { id:'m2', name:'Rahul Verma', preview:'Let\'s schedule a call', time:'1h', unread:0, active:false, initials:'RV', color:'#26a69a' },
  { id:'m3', name:'Ananya Krishnan', preview:'Shared a job posting', time:'3h', unread:1, active:true, initials:'AK', color:'#7c3aed' },
  { id:'m4', name:'Dr. Sunita Rao', preview:'Mentorship session confirmed', time:'1d', unread:0, active:false, initials:'SR', color:'#f59e0b' },
  { id:'m5', name:'Kavya Nair', preview:'Thanks for the advice!', time:'2d', unread:0, active:false, initials:'KN', color:'#ef5350' },
];

const initialMessages = {
  m1: [
    { id:1, from:'them', text:'Hey Arjun! Saw your post about React performance. Really insightful!', time:'10:23 AM' },
    { id:2, from:'me', text:'Thanks Priya! I\'ve been diving deep into React 19 concurrent features.', time:'10:25 AM' },
    { id:3, from:'them', text:'We\'re actually looking for someone with that expertise at Google. Interested in a chat?', time:'10:26 AM' },
    { id:4, from:'me', text:'Absolutely! I\'d love to explore the opportunity.', time:'10:28 AM' },
    { id:5, from:'them', text:'Great talking to you!', time:'10:30 AM' },
  ],
  m2: [
    { id:1, from:'them', text:'Hi Arjun, I came across your profile. Impressive background!', time:'Yesterday' },
    { id:2, from:'me', text:'Thank you Rahul! FinSync sounds like a fascinating company.', time:'Yesterday' },
    { id:3, from:'them', text:'Let\'s schedule a call', time:'Yesterday' },
  ],
  m3: [
    { id:1, from:'them', text:'Arjun, I found this role that matches your profile perfectly.', time:'3h ago' },
    { id:2, from:'them', text:'Shared a job posting', time:'3h ago' },
  ],
};

export default function MessagesPage() {
  const [selected, setSelected] = useState('m1');
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');
  const [search, setSearch] = useState('');

  const contact = contacts.find(c => c.id === selected);
  const thread = messages[selected] || [];
  const filteredContacts = contacts.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  const send = () => {
    if (!draft.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
    setMessages(prev => ({
      ...prev,
      [selected]: [...(prev[selected] || []), { id: Date.now(), from:'me', text: draft, time: now }],
    }));
    setDraft('');
  };

  return (
    <div className="messages-page">
      {/* ── Contact list ── */}
      <aside className="contacts-panel card">
        <div className="contacts-search">
          <Search size={14} className="text-muted" style={{ position:'absolute', left:'12px' }} />
          <input
            className="input"
            style={{ paddingLeft:'32px' }}
            placeholder="Search messages…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {filteredContacts.map(c => (
          <div
            key={c.id}
            className={`contact-row ${selected === c.id ? 'active' : ''}`}
            onClick={() => setSelected(c.id)}
          >
            <div style={{ position:'relative' }}>
              <div className="avatar-placeholder avatar-md" style={{ background:`linear-gradient(135deg,${c.color},${c.color}88)` }}>
                {c.initials}
              </div>
              {c.active && <span className="online-dot" />}
            </div>
            <div style={{ flex:1, overflow:'hidden' }}>
              <div className="flex justify-between items-center">
                <p className="fw-600 text-sm truncate">{c.name}</p>
                <p className="text-xs text-muted">{c.time}</p>
              </div>
              <p className="text-xs text-muted truncate">{c.preview}</p>
            </div>
            {c.unread > 0 && <span className="unread-badge">{c.unread}</span>}
          </div>
        ))}
      </aside>

      {/* ── Conversation ── */}
      <main className="conversation-panel card">
        {/* Header */}
        <div className="convo-header">
          <div className="avatar-placeholder avatar-sm" style={{ background:`linear-gradient(135deg,${contact.color},${contact.color}88)` }}>
            {contact.initials}
          </div>
          <div>
            <p className="fw-600 text-sm">{contact.name}</p>
            <p className="text-xs" style={{ color: contact.active ? 'var(--accent-green)' : 'var(--text-muted)' }}>
              {contact.active ? '● Online' : 'Offline'}
            </p>
          </div>
          <div className="convo-actions">
            <button className="convo-action-btn"><Phone size={16} /></button>
            <button className="convo-action-btn"><Video size={16} /></button>
            <button className="convo-action-btn"><MoreHorizontal size={16} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="messages-thread">
          {thread.map(msg => (
            <div key={msg.id} className={`message-row ${msg.from === 'me' ? 'mine' : 'theirs'}`}>
              <div className="message-bubble">
                <p>{msg.text}</p>
                <span className="message-time">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="message-input-row">
          <input
            className="input"
            placeholder="Type a message…"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
          />
          <button className="btn btn-primary btn-sm" onClick={send}>
            <Send size={14} />
          </button>
        </div>
      </main>
    </div>
  );
}
