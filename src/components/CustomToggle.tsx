export const CustomToggle = ({ checked, onChange }: { checked: boolean, onChange: () => void }) => (
      <div onClick={onChange} style={{ width: '48px', height: '26px', background: checked ? '#10B981' : '#E2E8F0', borderRadius: '13px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
        <div style={{ position: 'absolute', top: '2px', left: checked ? '24px' : '2px', width: '22px', height: '22px', background: '#fff', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'left 0.2s' }} />
      </div>
    );
